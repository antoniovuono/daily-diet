import Fastify from 'fastify'

const app = Fastify()

app.get('/', () => {
  return 'Welcome to daily diet api'
})

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('Server is running on port 3333')
  })
  .catch((err) => {
    console.log('Error starting server on port 3333', err)
  })
