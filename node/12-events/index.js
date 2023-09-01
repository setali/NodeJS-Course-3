const myEvent = require('./my-event')
require('./event-handler')

setTimeout(() => {
  myEvent.emit('Hello', 'Ali', 'Mousavi')
}, 1000)

setTimeout(() => {
  myEvent.emit('pow', 2, 6)
}, 2000)

setTimeout(() => {
  myEvent.emit('mul', 2, 6, 7, 8)
}, 3000)

myEvent.on('mul-result', console.log)
