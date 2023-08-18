// const buf = Buffer.alloc(10, 'zbc')

// console.log(buf)

// console.log(typeof buf)

// console.log(buf[0])
// console.log(buf[5])
// console.log(buf[10])

// console.log(Array.isArray(buf))

// for (const b of buf) {
//   console.log(b)
// }

// buf.forEach(element => {
//   console.log(element)
// })

// console.log(buf.toString())
// console.log(buf.toString('base64'))

// const buf = Buffer.alloc(3, 'Ali')

// console.log(buf)

// console.log(buf.toString('base64'))

// 01000001 01101100 01101001
// 010000 010110 110001 101001
// Q      W      x      p

// QWxp

// const buf = Buffer.allocUnsafe(10)

// console.log(buf)
// console.log(buf.toString())

// const buf = Buffer.from('Ali Mousavi')

// console.log(buf)
// console.log(buf.length)

// const buf2 = Buffer.from(buf)

// console.log(buf2)
// console.log(buf2.toString())

// const newBuf = Buffer.from([97, 98, 99])

// console.log(newBuf)
// console.log(newBuf.length)
// console.log(newBuf.toString())

const buf = Buffer.from('علی موسوی')

console.log(buf)
console.log(buf.length)

console.log('علی موسوی'.length)
console.log(buf.toString())

