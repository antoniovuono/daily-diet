import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { knex } from '../database'
import { z } from 'zod'
import { randomUUID } from 'node:crypto'

export const mealsRoutes = async (app: FastifyInstance) => {
  app.post(
    '/',
    async (
      request: FastifyRequest & { user?: string },
      reply: FastifyReply,
    ) => {
      try {
        const mealsSchema = z.object({
          name: z.string(),
          description: z.string(),
          dietMeal: z.boolean(),
        })

        const { name, description, dietMeal } = mealsSchema.parse(request.body)

        console.log({
          id: randomUUID(),
          name,
          description,
          dietMeal,
          user_id: request.user,
        })

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
}
