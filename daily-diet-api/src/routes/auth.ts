import { FastifyInstance } from 'fastify'
import { authenticateSchema } from '../schemas/usersSchemas'
import { knex } from '../database'
import bcrypt from 'bcrypt'
import { env } from '../envs'
import jwt from 'jsonwebtoken'

export const authRoutes = async (app: FastifyInstance) => {
  app.post('/', async (request, reply) => {
    const { email, password } = authenticateSchema.parse(request.body)

    const user = await knex('users').where({ email }).first()

    const passwordIsCorrect = await bcrypt.compare(
      password,
      String(user?.password),
    )

    if (!passwordIsCorrect) {
      return reply.status(401).send({ message: 'Invalid email or password' })
    }

    const secretToken = env.SECRET_TOKEN

    const jwtToken = jwt.sign({ id: user?.id }, secretToken, {
      expiresIn: '7d',
    })

    return reply.status(200).send({ email: user?.email, token: jwtToken })
  })
}
