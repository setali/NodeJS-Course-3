const { spawn } = require('child_process')
const path = require('path')
process.title = 'Node - Parent'

const controller = new AbortController()

const child = spawn('node', [path.resolve(__dirname, 'child.js')], {
  signal: controller.signal
})

console.log('~Child ID', child.pid)
console.log('~Parent ID', process.pid)
console.log('~Shell ID', process.ppid)

child.stdout.on('data', data => {
  console.log('stdout', data.toString())
})

child.stderr.on('data', data => {
  console.log('stderr', data.toString())
})

setTimeout(() => {
  controller.abort()
}, 5000)

setTimeout(() => {
  console.log('Parent timeout')
}, 10000)

child.on('close', code => {
  console.log('Child terminated', code)
})

// setTimeout(() => {
//   process.exit()
// }, 2000)
