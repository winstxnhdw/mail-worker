import { cleanEnv, makeValidator, str } from 'envalid'

const region = makeValidator((region) => {
  if (typeof region !== 'string') throw new Error('Region must be a string.')
  if (!/^[a-z]{2}-[a-z]+-\d$/.test(region)) throw new Error('Region must be in the format of "xx-xxxx-x".')
  return region
})

export const get_config = (environment: Record<string, unknown>) =>
  cleanEnv(environment, {
    AWS_REGION: region(),
    AWS_ACCESS_KEY_ID: str(),
    AWS_SECRET_ACCESS_KEY: str(),
  })
