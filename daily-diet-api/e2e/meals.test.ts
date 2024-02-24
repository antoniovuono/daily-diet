import { afterAll, beforeAll, describe, it } from 'vitest'
import { app } from '../src/app'
import { beforeEach } from 'node:test'
import { execSync } from 'node:child_process'
import request from 'supertest'
import { randomUUID } from 'node:crypto'

describe('Meals', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(() => {
    execSync('yarn run knex migrate:rollback')
    execSync('yarn run knex migrate:latest')
  })

  it('should be able to create a meal', async () => {
    await request(app.server).post('/users/create-user').send({
      id: randomUUID(),
      firstName: 'John',
      lastName: 'Doe',
      email: 'jhon@test.com',
      password: '123456',
      phone: '123456789',
    })

    const authenticate = await request(app.server).post('/auth').send({
      email: 'jhon@test.com',
      password: '123456',
    })

    const { token } = authenticate.body

    await request(app.server)
      .post('/meals')
      .send({
        name: 'Churrasco',
        description: 'Almoço de domingo',
        dietMeal: false,
      })
      .set('Authorization', `Bearer ${token}`)
  })
  it.todo(
    'should return 500 if there is an error on create meal route',
    async () => {},
  )

  it.todo('should be able to list all user meals', async () => {})
  it.todo(
    'should return 500 if there is an error on list all meals route',
    async () => {},
  )
  it.todo('should be able to get a user meal by id', async () => {})
})

it.todo(
  'should return 500 if there is an error on list a specific user meals route',
  async () => {},
)
