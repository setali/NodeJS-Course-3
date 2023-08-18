const http = require('http')
const fs = require('fs')
const path = require('path')

const server = http.createServer((req, res) => {
  res.setHeader('content-type', 'text/html')
  if (req.url === '/') {
    return res.end('Home Page')
  }

  if (req.url === '/about') {
    const data = fs.readFileSync(path.resolve(__dirname, 'about.html'))
    // res.statusCode = 302
    // res.writeHead(301, { Location: '/' })
    return res.end(data)
  }

  if (req.url === '/favicon.ico') {
    const data = fs.readFileSync(path.resolve(__dirname, 'favicon.ico'))
    return res.end(data)
  }

  res.statusCode = 404
  res.end('Not found')
})

server.listen(3000, () => {
  console.clear()
  console.log('Server is on port 3000')
})
