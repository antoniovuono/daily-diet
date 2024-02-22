import { z } from 'zod'

export const mealsSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  dietMeal: z.boolean().optional(),
})

export const mealIdSchema = z.object({
  id: z.string(),
})
