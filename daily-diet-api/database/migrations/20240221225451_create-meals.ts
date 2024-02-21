import { randomUUID } from 'node:crypto'
import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('meals', (table) => {
    table.uuid('id').primary().notNullable().unique().defaultTo(randomUUID())
    table.string('name').notNullable()
    table.string('description').notNullable()
    table.dateTime('date').notNullable()
    table.boolean('diet_meal').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
    table.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable()
    table
      .uuid('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('meals')
}
