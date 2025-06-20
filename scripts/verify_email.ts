import { SESClient, VerifyEmailIdentityCommand } from '@aws-sdk/client-ses';
import { get_config } from '@/config';

async function main() {
  const config = get_config(Bun.env);
  const email = prompt('[?] Email: ');

  if (!email) {
    throw new Error('Email is required!');
  }

  const credentials = {
    accessKeyId: config.AWS_ACCESS_KEY_ID,
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
  };

  const client = new SESClient({
    region: config.AWS_REGION,
    credentials: credentials,
  });

  await client.send(new VerifyEmailIdentityCommand({ EmailAddress: email })).then(console.log);
}

void main();
