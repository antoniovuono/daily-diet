import { FastifyInstance } from 'fastify'
import { authenticateSchema } from '../schemas/usersSchemas'
import { knex } from '../database'
import bcrypt from 'bcrypt'
import { env } from '../envs'
import jwt from 'jsonwebtoken'

export const authRoutes = async (app: FastifyInstance) => {
  app.post('/', async (request, reply) => {
    try {
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
        subject: user?.id,
        expiresIn: '7d',
      })

      return reply.status(201).send({ email: user?.email, token: jwtToken })
    } catch (err) {
      return reply
        .status(500)
        .send({ message: 'Failure to communicate with the database!', err })
    }
  })
}
