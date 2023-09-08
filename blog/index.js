import express from 'express'
import routes from './routes'

const app = express()

app.use(routes)

app.all('*', (req, res) => {
  res.status(404).send('Not Found')
})

app.use((err, req, res, next) => {
  console.log(err.message)
  res.status(400).send(err.message)
})

const port = 3000

app.listen(port, () => {
  console.clear()
  console.log(`Server is running on port ${port}`)
})
