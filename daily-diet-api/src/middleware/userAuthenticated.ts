import { FastifyReply, FastifyRequest } from 'fastify'
import jwt from 'jsonwebtoken'
import { env } from '../envs'
import { knex } from '../database'

export const userAuthenticated = async (
  request: FastifyRequest & { user?: { id: string } },
  reply: FastifyReply,
) => {
  const { authorization } = request.headers

  const token = (authorization as string)?.substring(7) // Remove 'Bearer ' prefix

  if (!token) {
    return reply.status(401).send({ message: 'Token not provided' })
  }

  try {
    const decoded = jwt.verify(token, env.SECRET_TOKEN) as { id: string }

    const user = await knex('users').where({ id: decoded.id }).first()

    if (!user) {
      return reply.status(401).send({ message: 'User not found' })
    }

    // Add user to request if you want to access it in your route handlers
    request.user = user
  } catch (err) {
    return reply.status(401).send({ message: 'Invalid token' })
  }
}
