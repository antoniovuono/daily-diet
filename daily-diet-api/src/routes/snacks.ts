import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'

export const snacksRoutes = async (app: FastifyInstance) => {
  app.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    return await reply.status(201).send({ message: 'Snacks' })
  })
}
