import { SESClient, SendRawEmailCommand } from '@aws-sdk/client-ses';
import { get_config } from '@/config';
import { cors } from '@/cors';
import { get_mail_request } from '@/get_mail_request';

async function main(request: Request, environment: Record<string, string>): Promise<Response> {
  if (request.method === 'OPTIONS') return new Response(null, { status: 204 });
  if (environment['AUTH_TOKEN'] && request.headers.get('Authorization') !== environment['AUTH_TOKEN']) {
    return new Response(null, { status: 401 });
  }

  const config = get_config(environment);
  const mail_request = await get_mail_request(request);

  if (!mail_request) {
    return new Response(null, { status: 400, statusText: 'Invalid mail request' });
  }

  const boundary = `sub_${crypto.randomUUID()}`;
  const email = [
    `From: ${mail_request.from}`,
    `To: ${mail_request.to.join(',')}`,
    `Cc: ${mail_request.cc.join(',')}`,
    `Subject: ${mail_request.subject}`,
    'MIME-Version: 1.0',
    `Content-Type: multipart/mixed; boundary="${boundary}"`,
    `\r\n--${boundary}`,
    'Content-Type: text/html; charset="UTF-8"',
    'Content-Transfer-Encoding: 7bit',
    `\r\n${mail_request.html}\r\n`,
  ];

  for (const { name, content, type } of mail_request.attachments) {
    email.push(`--${boundary}`);
    email.push(`Content-Type: ${type}; name="${name}"`);
    email.push(`Content-Disposition: attachment; filename="${name}"`);
    email.push('Content-Transfer-Encoding: base64');
    email.push(`\r\n${content}\r\n`);
  }

  email.push(`--${boundary}--`);

  const rawEmailCommand = new SendRawEmailCommand({
    RawMessage: { Data: new TextEncoder().encode(email.join('\r\n')) },
    Source: mail_request.from,
  });

  const credentials = {
    accessKeyId: config.AWS_ACCESS_KEY_ID,
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
  };

  const client = new SESClient({
    region: config.AWS_REGION,
    credentials: credentials,
  });

  const send_mail = await client.send(rawEmailCommand).catch(console.error);

  return !send_mail
    ? new Response(null, { status: 500, statusText: 'Email could not be sent' })
    : new Response(null, { status: 200, statusText: 'Email sent successfully' });
}

export default {
  fetch: cors(main),
};
