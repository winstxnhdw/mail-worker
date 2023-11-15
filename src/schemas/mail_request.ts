import { object, string } from 'zod'

export const MailRequestSchema = object({
  to: string().email().array(),
  from: string().email(),
  subject: string().optional(),
  html: string().optional(),
})
