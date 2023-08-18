// const buf = Buffer.from('Ali Mousavi')

// console.log(buf)

// const base64String = buf.toString('base64')

// console.log(base64String)

// const base64Buffer = Buffer.from(base64String, 'base64')

// console.log(base64Buffer)

// console.log(base64Buffer.toString('utf8'))

function convert (text, from, to) {
  return Buffer.from(text, from).toString(to)
}

const b = convert('Ali Mousavi', 'utf8', 'base64')

console.log(b)

const c = convert(b, 'base64', 'utf8')

console.log(c)

module.exports = convert
