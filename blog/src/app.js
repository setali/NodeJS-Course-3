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

export async function bootstrap () {
  const app = express()

  app.set('views', path.resolve(__dirname, 'views'))
  app.set('view engine', 'ejs')

  app.use(express.static('public'))
  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())

  app.use(methodOverride)

  await sequelize.authenticate()
  await sequelize.sync()

  const redisClient = new Redis(6083)

  const store = new RedisStore({ client: redisClient })

  app.use(
    session({
      store,
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: true
    })
  )

  app.use(auth)

  app.use(routes)

  app.use(errorHandler)

  app.listen(process.env.PORT, () => {
    console.clear()
    console.log(`Server is running on port ${process.env.PORT}`)
  })
}
