/* eslint-disable @typescript-eslint/no-explicit-any */
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { knex } from '../database'
import { randomUUID } from 'node:crypto'
import { mealIdSchema, mealsSchema } from '../schemas/mealsSchemas'

export const mealsRoutes = async (app: FastifyInstance) => {
  app.post(
    '/',
    async (
      request: FastifyRequest & { user?: string },
      reply: FastifyReply,
    ) => {
      try {
        const { name, description, dietMeal } = mealsSchema.parse(request.body)

        await knex('meals').insert({
          id: randomUUID(),
          name,
          description,
          diet_meal: dietMeal,
          user_id: request.user,
        })

        return reply.status(201).send()
      } catch (err) {
        console.error(err)
        return reply
          .status(500)
          .send({ message: 'Failure to communicate with the database!"', err })
      }
    },
  )

  app.get(
    '/',
    async (
      request: FastifyRequest & { user?: string },
      reply: FastifyReply,
    ) => {
      try {
        const meals = await knex('meals')
          .where({ user_id: request.user })
          .select('*')

        return reply.status(201).send(meals)
      } catch (err) {
        return reply
          .status(500)
          .send({ message: 'Failure to communicate with the database!"', err })
      }
    },
  )

  app.get('/:id', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { id } = mealIdSchema.parse(request.params)

      const meal = await knex('meals').where({ id }).first()

      if (!meal) {
        return reply.status(404).send({ message: 'Meal not found' })
      }

      return reply.status(201).send(meal)
    } catch (err) {
      return reply
        .status(500)
        .send({ message: 'Failure to communicate with the database!"', err })
    }
  })

  app.patch(
    '/update/:id',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { name, description, dietMeal } = mealsSchema.parse(request.body)
        const { id } = mealIdSchema.parse(request.params)

        const updateData: any = {}

        if (name !== undefined) updateData.name = name
        if (description !== undefined) updateData.description = description
        if (dietMeal !== undefined) updateData.diet_meal = dietMeal

        await knex('meals').where({ id }).update(updateData)

        return reply.status(201).send({ message: 'Meal updated' })
      } catch (err) {
        return reply
          .status(500)
          .send({ message: 'Failure to communicate with the database!"', err })
      }
    },
  )

  app.delete('/:id', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { id } = mealIdSchema.parse(request.params)

      await knex('meals').where({ id }).delete()

      if (!id) {
        return reply.status(404).send({ message: 'Meal not found' })
      }

      return reply.status(201).send({ message: 'Meal deleted' })
    } catch (err) {
      return reply
        .status(500)
        .send({ message: 'Failure to communicate with the database!"', err })
    }
  })

  app.get(
    '/metrics',
    async (
      request: FastifyRequest & { user?: string },
      reply: FastifyReply,
    ) => {
      try {
        const totalMeals = await knex('meals')
          .where({ user_id: request.user })
          .select('*')

        const { bestOnDietSequence } = totalMeals.reduce(
          (acc, meal) => {
            if (meal.diet_meal) {
              acc.currentSequence += 1
            } else {
              acc.currentSequence = 0
            }

            if (acc.currentSequence > acc.bestOnDietSequence) {
              acc.bestOnDietSequence = acc.currentSequence
            }

            return acc
          },
          { bestOnDietSequence: 0, currentSequence: 0 },
        )

        return reply.status(201).send({
          totalMeals: totalMeals.length,
          totalDietMeals: totalMeals.filter((meal) => meal.diet_meal).length,
          totalNonDietMeals: totalMeals.filter((meal) => !meal.diet_meal)
            .length,
          bestOnDietSequence,
        })
      } catch (err) {
        return reply
          .status(500)
          .send({ message: 'Failure to communicate with the database!"', err })
      }
    },
  )
}
