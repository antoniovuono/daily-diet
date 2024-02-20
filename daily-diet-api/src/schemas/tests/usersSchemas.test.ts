import { describe, expect, it } from 'vitest'
import { authenticateSchema, createUserSchema } from '../usersSchemas'

describe('usersSchema', () => {
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

  it('should successfully validate a authenticate schema with correct data', () => {
    const auth = {
      email: 'user@test.com',
      password: '12345',
    }

    expect(authenticateSchema.parse(auth)).toEqual(auth)
  })
})
