import fastify from 'fastify'
import {OrganizationHandler} from './src/handlers/organization'

const server = fastify()

server.get('/api/v1/organization/:id', OrganizationHandler.getByIdHandler)

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})