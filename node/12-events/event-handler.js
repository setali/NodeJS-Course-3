const myEvent = require('./my-event')

myEvent.on('Hello', (name, family) => {
  console.log(name, family)
})

myEvent.on('pow', (a, b) => console.log(a ** b))

myEvent.on('mul', (...args) => {
  const result = args.reduce((acc, el) => acc * el)
  myEvent.emit('mul-result', result)
})
