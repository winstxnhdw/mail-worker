import { get_config } from '@/config'
import { get_mail_request } from '@/get_mail_request'
import type { Environment } from '@/types'
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses'

async function main(request: Request, environment: Environment): Promise<Response> {
  const config = get_config(environment)
  
  // Authentication step
  const requestToken = request.headers.get('x-auth-token');

  if (requestToken !== config.AUTH_TOKEN) {
    return new Response('Unauthorized! Please specify your token in the request.', { status: 401 })
  }

  const mail_request = await get_mail_request(request)

  if (!mail_request) {
    return new Response('Invalid request!', { status: 400 })
  }

  const message = {
    Subject: { Data: mail_request.subject },
    Body: { Html: { Data: mail_request.html } },
  }

  const mail = new SendEmailCommand({
    Source: mail_request.from,
    ReturnPath: mail_request.from,
    Destination: { ToAddresses: mail_request.to },
    Message: message,
  })

  const credentials = {
    accessKeyId: config.AWS_ACCESS_KEY_ID,
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
  }

  const client = new SESClient({
    region: config.AWS_REGION,
    credentials: credentials,
  })

  const send_mail = await client.send(mail).catch(console.error)

  return !send_mail
    ? new Response('Failed to send email!', { status: 500 })
    : new Response('Email sent!', { status: 200 })
}

export default {
  fetch: main,
}
