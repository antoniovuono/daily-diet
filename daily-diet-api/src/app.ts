import Fastify from 'fastify'
import { usersRoutes } from './routes/users'
import { authRoutes } from './routes/auth'
import { snacksRoutes } from './routes/snacks'
import { userAuthenticated } from './middleware/userAuthenticated'

export const app = Fastify()

app.register(usersRoutes, {
  prefix: '/users',
})

app.register(authRoutes, {
  prefix: '/auth',
})

app
  .register(snacksRoutes, {
    prefix: '/snacks',
  })
  .addHook('preHandler', userAuthenticated)
