import { object, string } from 'zod'

export const get_config = (environment: Record<string, unknown>) =>
  object({
    AWS_REGION: string().regex(/^[a-z]{2}-[a-z]+-\d$/, {
      message: 'Region must be in the format of "xx-xxxx-x".',
    }),
    AWS_ACCESS_KEY_ID: string().regex(/^[A-Z0-9]{20}$/, {
      message: 'Access key must be 20 characters long and only contain uppercase letters and numbers.',
    }),
    AWS_SECRET_ACCESS_KEY: string(),
  }).parse(environment)
