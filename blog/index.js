const express = require('express')

const app = express()

app.use((req, res, next) => {
  console.log(req.url)

  next()
})

app.use((req, res, next) => {
  //   throw new Error('Middleware Error')
  next()
})

app.use('/about*', (req, res, next) => {
  console.log('About middleware')

  //   return res.send('Alo')
  next()
})

app.get('/', (req, res) => {
  //   throw new Error('Homepage error')

  res.send('Hello word')
})

app.get('/about', (req, res) => {
  //   res.statusCode = 202
  res.status(202).send('About us')
})

app.get('/api', (req, res) => {
  console.log(req.get('host'))
  return res.json({ name: 'ali' })
  console.log('salam')
})

app.get('/user/*', (req, res) => {
  return res.send('User')
})

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
