import { object, string } from 'zod'

export const MailRequestSchema = object({
  from: string().email(),
  to: string().email().array(),
  cc: string().email().array().default([]),
  bcc: string().email().array().default([]),
  subject: string().optional(),
  html: string().optional(),
})
