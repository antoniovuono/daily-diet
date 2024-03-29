import { afterAll, beforeAll, describe, it, beforeEach } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'
import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'

describe('Create User', () => {
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

  it('should be able to create a new user', async () => {
    await request(app.server)
      .post('/users/create-user')
      .send({
        id: randomUUID(),
        firstName: 'John',
        lastName: 'Doe',
        email: 'jhon@test.com',
        password: '123456',
        phone: '123456789',
      })
      .expect(201)
  })

  it("shouldn't be able to create a new user with an existing email", async () => {
    await request(app.server).post('/users/create-user').send({
      id: randomUUID(),
      firstName: 'John',
      lastName: 'Doe',
      email: 'jhon@test.com',
      password: '123456',
      phone: '123456789',
    })

    await request(app.server)
      .post('/users/create-user')
      .send({
        id: randomUUID(),
        firstName: 'John',
        lastName: 'Doe',
        email: 'jhon@test.com',
        password: '123456',
        phone: '123456789',
      })
      .expect(409)
  })

  it('should return 500 if there is an error', async () => {
    await request(app.server)
      .post('/users/create-user')
      .send({
        id: randomUUID(),
        firstName: 'John',
        lastName: 'Doe',
      })
      .expect(500)
  })
})
