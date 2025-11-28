import '@/polyfills';

import { SESv2Client, SendEmailCommand } from '@aws-sdk/client-sesv2';
import { getConfig } from '@/config';
import { cors } from '@/cors';
import { getMailRequest } from '@/get-mail-request';

async function main(request: Request, environment: Record<string, string>) {
  if (environment['AUTH_TOKEN'] && request.headers.get('Authorization') !== environment['AUTH_TOKEN']) {
    return new Response(null, { status: 401 });
  }

  const config = getConfig(environment);
  const mailRequest = await getMailRequest(request);

  if (!mailRequest) {
    return new Response(null, { status: 400, statusText: 'Invalid mail request' });
  }

  const boundary = `sub_${crypto.randomUUID()}`;
  const email = [
    `From: ${mailRequest.from}`,
    `To: ${mailRequest.to.join(',')}`,
    `Cc: ${mailRequest.cc.join(',')}`,
    `Subject: ${mailRequest.subject}`,
    'MIME-Version: 1.0',
    `Content-Type: multipart/mixed; boundary="${boundary}"`,
    `\r\n--${boundary}`,
    'Content-Type: text/html; charset="UTF-8"',
    'Content-Transfer-Encoding: 7bit',
    `\r\n${mailRequest.html}\r\n`,
  ];

  for (const { name, content, type } of mailRequest.attachments) {
    email.push(
      `--${boundary}`,
      `Content-Type: ${type}; name="${name}"`,
      `Content-Disposition: attachment; filename="${name}"`,
      'Content-Transfer-Encoding: base64',
      `\r\n${content}\r\n`,
    );
  }

  email.push(`--${boundary}--`);

  const rawEmailCommand = new SendEmailCommand({
    Content: { Raw: { Data: new TextEncoder().encode(email.join('\r\n')) } },
  });

  const credentials = {
    accessKeyId: config.AWS_ACCESS_KEY_ID,
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
  };

  const client = new SESv2Client({
    region: config.AWS_REGION,
    credentials: credentials,
  });

  const sendMail = await client.send(rawEmailCommand).catch(console.error);

  return !sendMail
    ? new Response(null, { status: 500, statusText: 'Email could not be sent' })
    : new Response(null, { status: 200, statusText: 'Email sent successfully' });
}

export default {
  fetch: cors(main),
};
