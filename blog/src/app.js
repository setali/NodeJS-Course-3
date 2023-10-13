import express from 'express'
import routes from './routes'
import errorHandler from './middlewares/error-handler'
import path from 'path'
import methodOverride from './middlewares/method-override'
import { sequelize } from './config/database'

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

  app.use(routes)

  app.use(errorHandler)

  app.listen(process.env.PORT, () => {
    console.clear()
    console.log(`Server is running on port ${process.env.PORT}`)
  })
}
