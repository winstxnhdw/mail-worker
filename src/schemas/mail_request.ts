import { object, string } from 'zod'

export const MailRequestSchema = object({
  from: string().email(),
  to: string().email().array(),
  cc: string().email().array().optional(),
  bcc: string().email().array().optional(),
  subject: string().optional(),
  html: string().optional(),
})
