const heavyProcess = require('./heavyProcess')
process.title = 'Node - Child'

console.log(process.pid)
console.log(process.ppid)

process.on('message', data => console.log(data))

process.send({ family: 'Mousavi' })

console.log(heavyProcess())

setInterval(() => {
  console.log('Child', process.pid, Date.now())
}, 1000)
