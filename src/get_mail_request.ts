import type { MailRequest } from '@/types/'

const parse_mail_request = async (request: Request): Promise<MailRequest | undefined> => {
  try {
    return request.json()
  } catch {
    return undefined
  }
}

export const verify_mail_request = (mail_request: MailRequest): MailRequest | undefined =>
  mail_request.from === undefined ||
  mail_request.subject === undefined ||
  mail_request.html === undefined ||
  mail_request.to === undefined ||
  mail_request.to.length === undefined ||
  mail_request.to.length === 0 ||
  !Array.isArray(mail_request.to)
    ? undefined
    : mail_request

export const get_mail_request = async (request: Request): Promise<MailRequest | undefined> => {
  const mail_request = await parse_mail_request(request)
  return mail_request !== undefined ? verify_mail_request(mail_request) : mail_request
}
