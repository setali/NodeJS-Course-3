const http = require('http')
const path = require('path')
const fs = require('fs')
const URL = require('url')
const qs = require('qs')

function initApp (req, res) {
  const { pathname, query } = URL.parse(req.url)

  req.query = qs.parse(query)

  req.pathname = pathname

  res.json = data => {
    res.setHeader('content-type', 'application/json')
    res.end(JSON.stringify(data))
  }
}

const server = http.createServer((req, res) => {
  initApp(req, res)

  const { pathname, method } = req

  if (pathname === '/login' && method === 'GET') {
    return res.end(fs.readFileSync(path.resolve(__dirname, 'login.html')))
  }

  if (pathname === '/login' && method === 'POST') {
    const data = []
    req.on('data', chunk => {
      data.push(chunk)
    })

    req.on('end', () => {
      const buffer = Buffer.concat(data)
      const str = buffer.toString()
      const body = qs.parse(str)
      res.json(body)
    })

    return
  }
  res.statusCode = 404
  res.end('Not found')
})

server.listen(3000, () => {
  console.clear()
  console.log('Run')
})
