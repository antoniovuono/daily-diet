import { FastifyInstance } from 'fastify'

export const usersRoutes = async (app: FastifyInstance) => {
  app.get('/', () => {
    return 'Welcome to daily diet users routes'
  })
}
