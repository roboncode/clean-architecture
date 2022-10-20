import { closeDatabase, getConcreteNumberTrivia, getRandomNumberTrivia } from './api/numberTrivia'

import { PORT } from './config'
import cors from '@fastify/cors'
import fastify from 'fastify'

const server = fastify().register(cors)

server.get('/', async (request, response) => {
  return response.redirect('/trivia')
})

server.get('/trivia', async request => {
  const q = request.query as { number?: string }
  if (q.number) {
    return await getConcreteNumberTrivia(Number(q.number))
  }
  return await getRandomNumberTrivia()
})

server.listen({ port: PORT }, (err, address) => {
  if (err) {
    console.error(err)
    closeDatabase()
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
