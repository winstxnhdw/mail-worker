type Email = `${string}@${string}.${string}`

export interface MailRequest {
  to: Email[]
  from: Email
  subject: string
  html: string
}
