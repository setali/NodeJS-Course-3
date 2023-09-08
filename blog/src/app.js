import express from 'express'
import routes from './routes'
import errorHandler from './middlewares/error-handler'
import path from 'path'

const app = express()

app.set('views', path.resolve(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.static('public'))

app.use(routes)

app.use(errorHandler)

const port = 3000

app.listen(port, () => {
  console.clear()
  console.log(`Server is running on port ${port}`)
})
