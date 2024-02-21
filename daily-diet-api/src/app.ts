import Fastify from 'fastify'
import { usersRoutes } from './routes/users'
import { authRoutes } from './routes/auth'
import { mealsRoutes } from './routes/meals'
import { userAuthenticated } from './middleware/userAuthenticated'

export const app = Fastify()

app.register(usersRoutes, {
  prefix: '/users',
})

app.register(authRoutes, {
  prefix: '/auth',
})

app
  .register(mealsRoutes, {
    prefix: '/meals',
  })
  .addHook('preHandler', userAuthenticated)
