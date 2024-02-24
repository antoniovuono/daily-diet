import { afterAll, beforeAll, describe, it } from 'vitest'
import request = require('supertest')
import { app } from '../src/app'
import { randomUUID } from 'node:crypto'
import { beforeEach } from 'node:test'
import { execSync } from 'node:child_process'

describe('Authentication', () => {
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

  it('Should be able to authenticate with valid credentials', async () => {
    await request(app.server).post('/users/create-user').send({
      id: randomUUID(),
      firstName: 'John',
      lastName: 'Doe',
      email: 'jhon@test.com',
      password: '123456',
      phone: '123456789',
    })

    await request(app.server)
      .post('/auth')
      .send({
        email: 'jhon@test.com',
        password: '123456',
      })
      .expect(201)
  })

  it('should not be able to authenticate with invalid credentials', async () => {
    await request(app.server).post('/users/create-user').send({
      id: randomUUID(),
      firstName: 'John',
      lastName: 'Doe',
      email: 'jhon@test.com',
      password: '123456',
      phone: '123456789',
    })

    await request(app.server)
      .post('/auth')
      .send({
        email: 'jhon@test.com',
        password: 'wrong-password',
      })
      .expect(401)
  })

  it('should return 500 if there is an error', async () => {
    await request(app.server).post('/auth').send({}).expect(500)
  })
})
