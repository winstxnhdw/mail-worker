import type { MailRequest } from '@/types/'

const parse_mail_request = async (request: Request): Promise<MailRequest> => request.json()

export const get_mail_request = async (request: Request): Promise<MailRequest | undefined> => {
  const mail_request = await parse_mail_request(request)

  if (
    mail_request.to === undefined ||
    mail_request.to.length === undefined ||
    mail_request.to.length === 0 ||
    mail_request.from === undefined ||
    mail_request.subject === undefined ||
    mail_request.html === undefined
  ) {
    return undefined
  }

  return mail_request
}
