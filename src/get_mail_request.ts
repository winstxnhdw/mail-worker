import { MailRequestSchema } from '@/schemas'
import type { z } from 'zod'

type MailRequest = z.infer<typeof MailRequestSchema>

const parse_mail_request = async (request: Request): Promise<Partial<MailRequest> | undefined> => {
  try {
    return request.json()
  } catch {
    return undefined
  }
}

export const get_mail_request = async (request: Request): Promise<MailRequest | undefined> => {
  const mail_request = await parse_mail_request(request)
  const verified_mail_request = MailRequestSchema.safeParse(mail_request)
  return verified_mail_request.success ? verified_mail_request.data : undefined
}
