import Fastify from 'fastify'
import { usersRoutes } from './routes/users'

export const app = Fastify()

app.register(usersRoutes, {
  prefix: '/users',
})
