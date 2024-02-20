import Fastify from 'fastify'
import { usersRoutes } from './routes/users'
import { authRoutes } from './routes/auth'

export const app = Fastify()

app.register(usersRoutes, {
  prefix: '/users',
})

app.register(authRoutes, {
  prefix: '/auth',
})
