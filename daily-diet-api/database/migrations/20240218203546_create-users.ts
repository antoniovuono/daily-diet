import type { Knex } from 'knex'
import { randomUUID } from 'node:crypto'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (table) => {
    table.uuid('id').primary().unique().defaultTo(randomUUID())
    table.string('first_name').notNullable()
    table.string('last_name').notNullable()
    table.string('email').unique().notNullable()
    table.string('password').notNullable()
    table.string('phone').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users')
}
