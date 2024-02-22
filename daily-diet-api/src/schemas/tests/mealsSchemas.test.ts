import { describe, expect, it } from 'vitest'
import { mealIdSchema, mealsSchema } from '../mealsSchemas'

describe('mealsSchemas', () => {
  it('Should successfully validate a meal schema with correct data', () => {
    const meal = {
      name: 'Meal Test',
      description: 'This is a test meal',
      dietMeal: true,
    }

    expect(mealsSchema.parse(meal)).toEqual(meal)
  })

  it('Should successfully validate a meal id schema with correct data', () => {
    const mealId = {
      id: 'test_id',
    }

    expect(mealIdSchema.parse(mealId)).toEqual(mealId)
  })
})
