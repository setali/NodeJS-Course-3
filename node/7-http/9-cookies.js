const http = require('http')

http
  .createServer((req, res) => {
    if (req.url === '/') {
      const entries =
        req.headers.cookie?.split('; ').map(el => el.split('=')) || []
      const cookies = Object.fromEntries(entries)

      console.log(cookies)
      let counter = +cookies.counter || 0

      res.setHeader(
        'Set-Cookie',
        `counter=${++counter};Max-Age=30000; HttpOnly; Secure`
      )
    }

    res.end('End')
  })
  .listen(3000, () => {
    console.clear()
    console.log('Server is running')
  })
