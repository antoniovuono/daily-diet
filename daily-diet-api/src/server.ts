import { app } from './app'
import { env } from './envs'

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log(`Server is running on port ${env.PORT}`)
  })
  .catch((err) => {
    console.log(`Error starting server on port ${env.PORT}`, err)
  })
