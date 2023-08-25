const http = require('http')
const fs = require('fs')
const path = require('path')
const URL = require('url')
const static = require('node-static')

const STATIC_DIR = 'public'

const fileServer = new static.Server(STATIC_DIR)

const server = http.createServer((req, res) => {
  const { pathname } = URL.parse(req.url)

  if (pathname === '/') {
    const data = fs.readFileSync(path.resolve(__dirname, 'index.html'))
    return res.end(data)
  }

  fileServer.serve(req, res, (error, res) => {
    if (error) {
      res.statusCode = 404
      res.end('Not Found')
    }
  })
})

server.listen(3000, () => {
  console.log('Server is running')
})
