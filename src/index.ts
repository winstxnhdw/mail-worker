import { get_config } from '@/config'
import { get_mail_request } from '@/get_mail_request'
import type { Environment } from '@/types'
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses'

export default {
  async fetch(request: Request, environment: Environment): Promise<Response> {
    const config = get_config(environment)
    const mail_request = await get_mail_request(request)

    if (mail_request === undefined) {
      return new Response('Invalid request!', { status: 400 })
    }

    const mail = new SendEmailCommand({
      Source: mail_request.from,
      ReturnPath: mail_request.from,
      Destination: { ToAddresses: mail_request.to },
      Message: {
        Subject: { Data: mail_request.subject },
        Body: { Html: { Data: mail_request.html } },
      },
    })

    const client = new SESClient({
      region: config.AWS_REGION,
      credentials: {
        accessKeyId: config.AWS_ACCESS_KEY_ID,
        secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
      },
    })

    const send_mail = await client.send(mail).catch(console.error)

    return send_mail === undefined
      ? new Response('Failed to send email!', { status: 500 })
      : new Response('Email sent!', { status: 200 })
  },
}
