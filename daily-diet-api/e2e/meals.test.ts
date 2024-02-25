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

  beforeEach(async () => {
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
      .expect(201)
  })

  it('should be able to list all user meals', async () => {
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
      .get('/meals')
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
  })

  it('should be able to get a user meal by id', async () => {
    await request(app.server).post('/users/create-user').send({
      id: 'ae1f8029-5ed0-42bf-9abb-10c7a29a72a7',
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

    const meals = await request(app.server)
      .get('/meals')
      .set('Authorization', `Bearer ${token}`)
      .expect(201)

    const { id } = meals.body[0]

    request(app.server)
      .get(`/meals/${id}`)
      .set('Authorization', `Bearer ${token}`)
  })

  it('should be able to update a user meal by id', async () => {
    await request(app.server).post('/users/create-user').send({
      id: 'ae1f8029-5ed0-42bf-9abb-10c7a29a72a7',
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

    const meals = await request(app.server)
      .get('/meals')
      .set('Authorization', `Bearer ${token}`)
      .expect(201)

    const { id } = meals.body[0]

    await request(app.server)
      .patch(`/meals/update/${id}`)
      .send({
        name: 'Madeiro Bacon',
        description: 'Janta no madero',
        dietMeal: false,
      })
      .expect(201)
      .set('Authorization', `Bearer ${token}`)
  })
  it('should be able to delete a user meal by id', async () => {
    await request(app.server).post('/users/create-user').send({
      id: 'ae1f8029-5ed0-42bf-9abb-10c7a29a72a7',
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

    const meals = await request(app.server)
      .get('/meals')
      .set('Authorization', `Bearer ${token}`)
      .expect(201)

    const { id } = meals.body[0]

    request(app.server)
      .delete(`/meals/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
  })
  it('should be able to return a meal mtric routes', async () => {
    await request(app.server).post('/users/create-user').send({
      id: 'ae1f8029-5ed0-42bf-9abb-10c7a29a72a7',
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

    request(app.server)
      .get('/meals/metric')
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
  })
})
