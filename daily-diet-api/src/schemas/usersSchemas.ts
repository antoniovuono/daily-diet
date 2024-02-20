import { z } from 'zod'

export const createUserSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string(),
  phone: z.string(),
})

export const authenticateSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})
