const http = require('http')
const path = require('path')
const fs = require('fs')
const URL = require('url')

function initApp (req, res) {
  const { pathname, query } = URL.parse(req.url)

  const entries = query?.split('&').map(el => el.split('='))

  req.query = entries ? Object.fromEntries(entries) : {}

  req.pathname = pathname

  res.json = data => {
    res.setHeader('content-type', 'application/json')
    res.end(JSON.stringify(data))
  }
}

const server = http.createServer((req, res) => {
  initApp(req, res)

  const { pathname, query } = req

  if (pathname === '/') {
    return res.end(fs.readFileSync(path.resolve(__dirname, 'form-get.html')))
  }

  if (pathname === '/contact') {
    return res.json(query)
  }

  res.statusCode = 404
  res.end('Not found')
})

server.listen(3000, () => {
  console.clear()
  console.log('Run')
})
