import fastify from 'fastify'
import cors from '@fastify/cors'
import {OrganizationHandler} from './handlers/organization'
import cookie, { FastifyCookieOptions } from "@fastify/cookie";
import {PrayerTypeHandler} from './handlers/prayerType'
import {PrayerCallHandler} from './handlers/prayerCall'
import {PrayerTimeHandler} from './handlers/prayerTime'

const server = fastify()

server.register(cors, { 
  // put your options here
})

server.get('/api/v1/organization/:id', OrganizationHandler.getByIdHandler)
server.register(cookie, {
  secret: process.env.COOKIE_SECRET_KEY as string,
  hook: false,
  parseOptions: {} ,
} as FastifyCookieOptions)
server.post('/api/v1/organization', OrganizationHandler.createHandler)

server.get('/api/v1/prayer-type', PrayerTypeHandler.getAllHandler)
server.post('/api/v1/prayer-type', PrayerTypeHandler.createHandler)

server.get('/api/v1/prayer-call', PrayerCallHandler.getAllHandler)
server.post('/api/v1/prayer-call', PrayerCallHandler.createHandler)

server.get('/api/v1/prayer-time/:organizationId/:time',
  PrayerTimeHandler.getByTimeAndOrganizationHandler)
server.post('/api/v1/prayer-time', PrayerTimeHandler.createHandler)
server.put('/api/v1/prayer-time', PrayerTimeHandler.updateHandler)

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})