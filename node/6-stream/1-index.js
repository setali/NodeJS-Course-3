const Stream = require('stream')

const writeableStream = new Stream.Writable()

writeableStream._write = (chunk, encoding, next) => {
  console.log(chunk, chunk.toString(), encoding)
  next()
}

const readableStream = new Stream.Readable()

readableStream._read = size => {
  console.log('Size => ', size) // 16KB => 2 ** 14
}

readableStream.pipe(writeableStream)

let counter = 1

const intervalId = setInterval(() => {
  readableStream.push(String(counter++))
}, 1000)

readableStream.on('close', () => writeableStream.end())
writeableStream.on('close', () => console.log('Writable stream closed.'))

setTimeout(() => {
  clearInterval(intervalId)
  readableStream.destroy()
}, 12000)
