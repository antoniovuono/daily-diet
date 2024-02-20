import { FastifyInstance } from 'fastify'
import { randomUUID } from 'node:crypto'
import bcrypt from 'bcrypt'
import { knex } from '../database'
import { createUserSchema } from '../schemas/usersSchemas'

export const usersRoutes = async (app: FastifyInstance) => {
  app.post('/', async (request, reply) => {
    const { firstName, lastName, email, password, phone } =
      createUserSchema.parse(request.body)

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
  })
}
