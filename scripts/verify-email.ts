import { SESv2Client, SendCustomVerificationEmailCommand } from '@aws-sdk/client-sesv2';
import { getConfig } from '@/config';

async function main() {
  const config = getConfig(Bun.env);
  const email = prompt('[?] Email: ');

  if (!email) {
    throw new Error('Email is required!');
  }

  const credentials = {
    accessKeyId: config.AWS_ACCESS_KEY_ID,
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
  };

  const client = new SESv2Client({
    region: config.AWS_REGION,
    credentials: credentials,
  });

  await client
    .send(new SendCustomVerificationEmailCommand({ EmailAddress: email, TemplateName: email }))
    .then(console.log)
    .catch(console.error);
}

void main();
