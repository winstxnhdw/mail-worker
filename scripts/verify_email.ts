import { SESClient, VerifyEmailIdentityCommand } from '@aws-sdk/client-ses'
import 'dotenv/config'
import { cleanEnv, str } from 'envalid'
import readline from 'readline/promises'

const config = cleanEnv(process.env, {
  AWS_REGION: str(),
  AWS_ACCESS_KEY_ID: str(),
  AWS_SECRET_ACCESS_KEY: str()
})

async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  const email = await rl.question('[?] Email: ')

  const client = new SESClient({
    region: config.AWS_REGION,
    credentials: {
      accessKeyId: config.AWS_ACCESS_KEY_ID,
      secretAccessKey: config.AWS_SECRET_ACCESS_KEY
    }
  })

  client
    .send(new VerifyEmailIdentityCommand({ EmailAddress: email }))
    .then(console.log)
    .catch(console.error)
}

main()
