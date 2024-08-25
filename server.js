import { fastify } from 'fastify'
import { DatabasePostgres } from './database-postgres.js'
import fastifyCors from '@fastify/cors';

const server = fastify();
const database = new DatabasePostgres()

server.register(fastifyCors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  });

server.post('/usuarios', async (request, reply) => {
    const {nome, idade, email} = request.body

    await database.create({
        nome,
        idade,
        email,
    })

    return reply.status(201).send()
})

server.get('/usuarios', async (request) => {
    const search = request.query.search

    const usuarios = await database.list(search)

    return usuarios
})

server.put('/usuarios/:id', async (request, reply) => {
    const userId = request.params.id
    const {nome, idade, email} = request.body

    await database.update(userId, {
        nome,
        idade,
        email,
    })

    return reply.status(204).send()
})

server.delete('/usuarios/:id', async (request, reply) => {
    const userId = request.params.id

   await database.delete(userId)

    return reply.status(204).send()
})

server.listen({
    host: '0.0.0.0',
    port: process.env.PORT ?? 3333,
})