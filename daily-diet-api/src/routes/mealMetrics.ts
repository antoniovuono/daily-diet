import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { knex } from '../database'

export const mealMetrics = async (app: FastifyInstance) => {
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

        return reply.status(201).send({
          totalMeals: meals.length,
          totalDietMeals: meals.filter((meal) => meal.diet_meal).length,
          totalNonDietMeals: meals.filter((meal) => !meal.diet_meal).length,
        })
      } catch (err) {
        return reply
          .status(500)
          .send({ message: 'Failure to communicate with the database!"', err })
      }
    },
  )
}
