const http = require('http')
const path = require('path')
const fs = require('fs')

const server = http.createServer((req, res) => {
  const filePath = path.resolve(__dirname, 'music.mp3')

  const stream = fs.createReadStream(filePath, { highWaterMark: 1024 })

  // stream.pipe(process.stdout)
  stream.pipe(res)

  setTimeout(() => {
    stream.pause()
    // stream.unpipe()
  }, 500)

  setTimeout(() => {
    stream.resume()
    console.log('resume')
  }, 40000)
})

server.listen(3000, () => console.log('server is running'))
