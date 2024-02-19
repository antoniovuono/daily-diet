// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Knex } from 'knex'

declare module 'knex/types/tables' {
  interface Tables {
    id: string
    firstName: string
    lastName: string
    email: string
    password: string
    phone: string
    created_at: string
  }
}
