import type { z } from 'zod';
import { MailRequestSchema } from '@/schemas';

type MailRequest = z.infer<typeof MailRequestSchema>;

export const getMailRequest = async (request: Request): Promise<MailRequest | undefined> => {
  const mailRequestPayload = await request.json();
  const verifiedMailRequest = MailRequestSchema.safeParse(mailRequestPayload as Partial<MailRequest>);

  return verifiedMailRequest.success ? verifiedMailRequest.data : undefined;
};
