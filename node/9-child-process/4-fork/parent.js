const heavyProcess = require('./heavyProcess')
const { fork } = require('child_process')

process.title = 'Node - Parent'
const subProcess = fork(`${__dirname}/child.js`)
// const subProcess2 = fork(`${__dirname}/child.js`)
// const subProcess3 = fork(`${__dirname}/child.js`)
// const subProcess4 = fork(`${__dirname}/child.js`)
// const subProcess5 = fork(`${__dirname}/child.js`)

//   console.log(heavyProcess()) // Lock Process

// setTimeout(() => {
//   console.log(heavyProcess()) // Lock Event Queue
// }, 0)

subProcess.send({ name: 'Ali' })

subProcess.on('message', data => console.log(data))

setTimeout(() => {
  console.log('salam')
}, 10)

setInterval(() => {
  console.log('Parent', Date.now())
}, 1000)

console.log(2 + 2)
