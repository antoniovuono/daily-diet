import { config } from 'dotenv'
import { envSchema } from '../schemas/envSchemas'

if (process.env.NODE_ENV === 'test') {
  config({ path: '.env.test' })
}

config()

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('Environment variables are not valid', _env.error.format())
  throw new Error('Environment variables are not valid')
}

export const env = _env.data
