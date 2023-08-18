const Stream = require('stream')
const fs = require('fs')
const path = require('path')

const chunks = []

const writeableStream = new Stream.Writable({
  write: (chunk, encoding, next) => {
    // console.log(chunk)
    chunks.push(chunk)
    next()
  }
})

const readableStream = new Stream.Readable({
  read: () => {}
})

readableStream.pipe(writeableStream)

readableStream.on('close', () => writeableStream.end())
writeableStream.on('close', () => {
  console.log('Writable stream closed.')
  const buffer = Buffer.concat(chunks)
  const newFilePath = path.resolve(__dirname, 'images', 'new-image.gif')
  fs.writeFileSync(newFilePath, buffer)
})

const filePath = path.resolve(__dirname, 'images', 'image.gif')

const data = fs.readFileSync(filePath)

const chunkSize = 2 ** 10 // 1024B   => 1KB

const chunkCount = Math.ceil(data.length / chunkSize)

for (let i = 0; i < chunkCount; i++) {
  const chunk = data.slice(i * chunkSize, (i + 1) * chunkSize)
  readableStream.push(chunk)
}

readableStream.destroy()
