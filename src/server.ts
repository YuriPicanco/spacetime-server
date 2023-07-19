import fastify from 'fastify'
import { memoriesRoutes } from './routes/memories'
import cors from '@fastify/cors'
import 'dotenv/config'
import { authRoutes } from './routes/auth'
import jwt from '@fastify/jwt'
import { uploadRoutes } from './routes/upload'
import multipart from '@fastify/multipart'
import { resolve } from 'node:path'

const app = fastify()

app.register(multipart)

app.register(require('@fastify/static'), {
  root: resolve(__dirname, '../uploads'),
  prefix: '/uploads',
})
app.register(jwt, { //autorização de rotas de acesso //
  secret: 'spacetime',
})
app.register(cors, { //autorização de rotas de acesso
  origin: true, //true = todas possíveis
})
app.register(authRoutes) //registro rota de autenticação

app.register(uploadRoutes) // registro de rota de upload
app.register(memoriesRoutes) // registra um arquivo de rotas separados



app
  .listen({
    port: 3333,
    host: '0.0.0.0',
  }).then(() => {
    console.log('HTTP server running on http://localhost:3333')
  })