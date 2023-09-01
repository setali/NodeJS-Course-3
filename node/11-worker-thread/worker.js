const { parentPort, workerData } = require('worker_threads')

console.log('worker pid', process.pid) // Same as master

parentPort.on('message', data => {
  console.log(data)
  parentPort.postMessage('Aleyk')
})

const result = (workerData.a ** workerData.b).toString().length

parentPort.postMessage(result)

// setTimeout(() => {
//     parentPort.postMessage('terminate')
// }, 5000)
