// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Knex } from 'knex'

declare module 'knex/types/tables' {
  interface Tables {
    users: {
      id: string
      first_name: string
      last_name: string
      email: string
      password: string
      phone: string
      created_at: string
    }
  }
}
