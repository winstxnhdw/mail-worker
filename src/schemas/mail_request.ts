import { array, object, string } from 'zod'

const AttachmentSchema = object({
  filename: string().default(crypto.randomUUID),
  content: string().nonempty().base64(),
  contentType: string().nonempty(),
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
