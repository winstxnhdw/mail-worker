import { array, object, string } from 'zod'

const AttachmentSchema = object({
  name: string().default(crypto.randomUUID),
  content: string().nonempty().base64(),
  type: string().nonempty(),
})

export const MailRequestSchema = object({
  from: string().email(),
  to: string().email().array(),
  cc: string().email().array().default([]),
  bcc: string().email().array().default([]),
  subject: string().optional(),
  html: string().optional(),
  attachments: array(AttachmentSchema).default([]),
})
