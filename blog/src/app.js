import express from 'express'
import routes from './routes'
import errorHandler from './middlewares/error-handler'
import path from 'path'
import fs from 'fs'

const app = express()

app.engine('ali', (filePath, params, callback) => {
  let view = fs.readFileSync(filePath, 'utf-8')

  const entries = Object.entries(params)

  entries.forEach(([key, value]) => {
    if (typeof value === 'string') {
      view = view.replace(`#${key}#`, value)
    }
  })

  return callback(null, view)
})

app.set('views', path.resolve(__dirname, 'views'))
app.set('view engine', 'ali')

app.use(express.static('public'))

app.use(routes)

app.use(errorHandler)

const port = 3000

app.listen(port, () => {
  console.clear()
  console.log(`Server is running on port ${port}`)
})
