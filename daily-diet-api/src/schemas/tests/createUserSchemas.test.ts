import { describe, expect, it } from 'vitest'
import { createUserSchema } from '../createUserSchemas'

describe('envSchema.test', () => {
  it('should successfully validate a user schema with correct data', () => {
    const user = {
      firstName: 'User',
      lastName: 'Test',
      email: 'user@test.com',
      password: 'password',
      phone: '1234567890',
    }

    expect(createUserSchema.parse(user)).toEqual(user)
  })
  it('should return error when invalid user data is provided', () => {
    const invalidUser = {
      firstName: 'User',
      lastName: 'Test',
      email: 'user@test.com',
      password: 'password',
    }

    expect(() => createUserSchema.parse(invalidUser)).toThrow()
  })
})
