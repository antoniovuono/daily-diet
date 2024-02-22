import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import bcrypt from 'bcrypt'
import { knex } from '../database'
import { createUserSchema } from '../schemas/usersSchemas'
import { randomUUID } from 'node:crypto'

export const usersRoutes = async (app: FastifyInstance) => {
  app.post(
    '/create-user',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { firstName, lastName, email, password, phone } =
          createUserSchema.parse(request.body)

        const userExists = await knex('users').where({ email }).first()

        if (userExists) {
          return reply.status(409).send({ message: 'User already exists!' })
        }

        const encryptedPassword = await bcrypt.hash(password, 10)

        await knex('users').insert({
          id: randomUUID(),
          first_name: firstName,
          last_name: lastName,
          email,
          password: encryptedPassword,
          phone,
        })

        return reply.status(201).send()
      } catch (err) {
        return reply
          .status(500)
          .send({ message: 'Failure to communicate with the database!', err })
      }
    },
  )
}
