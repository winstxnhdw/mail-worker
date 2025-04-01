import { get_config } from '@/config'
import { cors } from '@/cors'
import { get_mail_request } from '@/get_mail_request'
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses'

async function main(request: Request, environment: Record<string, string>): Promise<Response> {
  if (request.method === 'OPTIONS') return new Response(null, { status: 204 })
  if (environment['AUTH_TOKEN'] && request.headers.get('Authorization') !== environment['AUTH_TOKEN']) {
    return new Response(null, { status: 401 })
  }

  const config = get_config(environment)
  const mail_request = await get_mail_request(request)

  if (!mail_request) {
    return new Response(null, { status: 400, statusText: 'Invalid mail request' })
  }

  const body = {
    Html: { Data: mail_request.html },
  }

  const message = {
    Subject: { Data: mail_request.subject },
    Body: body,
  }

  const destination = {
    ToAddresses: mail_request.to,
    CcAddresses: mail_request.cc,
    BccAddresses: mail_request.bcc,
  }

  const mail = new SendEmailCommand({
    Source: mail_request.from,
    ReturnPath: mail_request.from,
    Destination: destination,
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
    ? new Response(null, { status: 500, statusText: 'Email could not be sent' })
    : new Response(null, { status: 200, statusText: 'Email sent successfully' })
}

export default {
  fetch: cors(main),
}
