import { knex as KnexSetup, Knex } from 'knex'
import { env } from './envs'

const config: Knex.Config = {
  client: 'sqlite',
  connection: {
    filename: env.DATABASE_URL,
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './database/migrations',
  },
}

const knex = KnexSetup(config)

export { config, knex }
