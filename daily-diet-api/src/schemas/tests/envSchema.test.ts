import { describe, expect, it } from 'vitest'
import { envSchema } from '../envSchemas'

describe('createUserSchemas', () => {
  it('should return success when valid user data is provided', () => {
    const envs = {
      NODE_ENV: 'test',
      DATABASE_URL: 'test:3333/test',
      PORT: 1111,
    }

    expect(envSchema.parse(envs)).toEqual(envs)
  })
  it('should return error when invalid user data is provided', () => {
    const invalidEnvs = {
      NODE_ENV: 'test',
      PORT: 1111,
    }

    expect(() => envSchema.parse(invalidEnvs)).toThrow()
  })
})
