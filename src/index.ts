import fastify from 'fastify'
import cors from '@fastify/cors'
import {OrganizationHandler} from './handlers/organization'

const server = fastify()

server.register(cors, { 
  // put your options here
})

server.get('/api/v1/organization/:id', OrganizationHandler.getByIdHandler)
server.post('/api/v1/organization', OrganizationHandler.createHandler)

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})