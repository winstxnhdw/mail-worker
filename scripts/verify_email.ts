import { SESClient, VerifyEmailIdentityCommand } from '@aws-sdk/client-ses'
import 'dotenv/config'
import { cleanEnv, str } from 'envalid'
import { createInterface } from 'readline/promises'

async function main() {
  const config = cleanEnv(process.env, {
    AWS_REGION: str(),
    AWS_ACCESS_KEY_ID: str(),
    AWS_SECRET_ACCESS_KEY: str()
  })

  const client = new SESClient({
    region: config.AWS_REGION,
    credentials: {
      accessKeyId: config.AWS_ACCESS_KEY_ID,
      secretAccessKey: config.AWS_SECRET_ACCESS_KEY
    }
  })

  const email = await createInterface({
    input: process.stdin,
    output: process.stdout
  }).question('[?] Email: ')

  client.send(new VerifyEmailIdentityCommand({ EmailAddress: email })).then(console.log)
}

main()
