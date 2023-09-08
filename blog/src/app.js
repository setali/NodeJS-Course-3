import express from 'express'
import routes from './routes'
import errorHandler from './middlewares/error-handler'
import renderTemplate from './middlewares/render-template'

const app = express()

app.use(express.static('public'))
app.use(renderTemplate)

app.use(routes)

app.use(errorHandler)

const port = 3000

app.listen(port, () => {
  console.clear()
  console.log(`Server is running on port ${port}`)
})
