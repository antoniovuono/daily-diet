import { describe, expect, it } from 'vitest'
import { envSchema } from '../envSchemas'

describe('envSchema.test', () => {
  it('should return success when valid user data is provided', () => {
    const envs = {
      NODE_ENV: 'test',
      DATABASE_URL: 'test:3333/test',
      PORT: 1111,
      SECRET_TOKEN: 'secret-example-token',
    }

    expect(envSchema.parse(envs)).toEqual(envs)
  })
})
