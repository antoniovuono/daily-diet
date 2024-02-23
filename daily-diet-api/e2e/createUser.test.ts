import { execSync } from 'node:child_process'
import { beforeEach } from 'node:test'
import { describe } from 'vitest'

describe('Create User', () => {
  beforeEach(() => {
    execSync('yarn run knex migrate:rollback')
    execSync('yarn run knex migrate:latest')
  })
})
