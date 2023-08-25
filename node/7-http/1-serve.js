const http = require('http')
const convert = require('../5-buffer/4-convert')

const server = http.createServer((req, res) => {
  //   console.log(req.url)
  //   console.log(req.method)
  //   console.log(req.httpVersion)
  //   //   console.log(req.headers)
  //   console.log(Object.keys(req))

  // //   res.statusCode = 404
  res.setHeader('content-type', 'text/html')
  //   res.setHeader('content-type', 'text/plain')
  //   res.setHeader('content-type', 'application/json')

  //   const buffer = Buffer.from('Ali Mousavi')

  const base64 = convert('Ali Mousavi', 'utf8', 'base64')
  console.log(base64)

  res.write('<h1>')
  res.write(base64, 'base64')
  res.write('</h1>')

  res.end()

  //   res.write('ali') //wrong

  console.log("Code work! You must use return if you don't want to work it")
})

server.listen(3000, () => {
  console.clear()
  console.log('Server is running on port 3000')
})


function startServer (port) {
  const server = http.createServer((req, res) => {
    res.end('salam')
  })

  server.on('error', err => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} is already in use. Trying next port...`)
      startServer(port + 1)
    } else {
      console.error('Server error:', err)
    }
  })

  server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })
}

startServer(3000)
