import { array, base64, email, object, string } from 'zod';

const AttachmentSchema = object({
  name: string().default(crypto.randomUUID),
  content: base64().min(1),
  type: string().min(1),
});

const MailRequestSchema = object({
  from: email(),
  to: email().array(),
  cc: email().array().default([]),
  bcc: email().array().default([]),
  subject: string().default(''),
  html: string().default(''),
  attachments: array(AttachmentSchema).default([]),
});

export const getMailRequest = async (request: Request) => {
  const mailRequestPayload = await request.json();
  const verifiedMailRequest = MailRequestSchema.safeParse(mailRequestPayload);

  return verifiedMailRequest.success ? verifiedMailRequest.data : undefined;
};
