import express from 'express'
import routes from './routes'
import errorHandler from './middlewares/error-handler'
import path from 'path'
import methodOverride from './middlewares/method-override'
import { sequelize } from './config/database'
import session from 'express-session'
import auth from './middlewares/auth'
import RedisStore from 'connect-redis'
import Redis from 'ioredis'
import socketIO from 'socket.io'
import http from 'http'
import chatApp from './chatApp'

export async function bootstrap () {
  const app = express()

  app.set('views', path.resolve(__dirname, 'views'))
  app.set('view engine', 'ejs')

  app.use(express.static('public'))
  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())

  app.use(methodOverride)

  await sequelize.authenticate()
  // await sequelize.sync({ alter: true })
  await sequelize.sync()

  const redisClient = new Redis(6083)

  const store = new RedisStore({ client: redisClient })

  const sessionMiddleware = session({
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
  })

  app.use(sessionMiddleware)

  app.use(auth)

  app.use(routes)

  app.use(errorHandler)

  const server = http.createServer(app)

  const io = new socketIO.Server(server)

  io.use((socket, next) => {
    sessionMiddleware(socket.request, {}, next)
  })

  io.use((socket, next) => {
    auth(socket.request, {}, next)
  })

  io.on('connection', socket => chatApp(io, socket))

  return server
}
