import type { z } from 'zod';
import { MailRequestSchema } from '@/schemas';

type MailRequest = z.infer<typeof MailRequestSchema>;

export const get_mail_request = async (request: Request): Promise<MailRequest | undefined> => {
  const mail_request = await request.json();
  const verified_mail_request = MailRequestSchema.safeParse(mail_request as Partial<MailRequest>);

  return verified_mail_request.success ? verified_mail_request.data : undefined;
};
