import Fastify from 'fastify'
import { usersRoutes } from './routes/users'
import { authRoutes } from './routes/auth'
import { mealsRoutes } from './routes/meals'
import { userAuthenticated } from './middleware/userAuthenticated'
import { mealMetrics } from './routes/mealMetrics'

export const app = Fastify()

app.register(usersRoutes, {
  prefix: '/users',
})

app.register(authRoutes, {
  prefix: '/auth',
})

app.register(async (mealsApp) => {
  mealsApp
    .register(mealsRoutes, {
      prefix: '/meals',
    })
    .addHook('preHandler', userAuthenticated)
})

app.register(async (mealsApp) => {
  mealsApp
    .register(mealMetrics, {
      prefix: '/meals-metrics',
    })
    .addHook('preHandler', userAuthenticated)
})
