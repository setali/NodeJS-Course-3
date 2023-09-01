const path = require('path')
const { Worker } = require('worker_threads')

process.title = 'Node multi thread'

console.log('master pid', process.pid)

const workerPath = path.resolve(__dirname, 'worker.js')

function makeWorker (a, b) {
  const worker = new Worker(workerPath, {
    workerData: { a, b }
  })

  worker.postMessage('salam')

  worker.on('message', data => {
    console.log(data)
    if (data === 'terminate') {
      worker.terminate()
    }
  })

  worker.on('error', console.log)

  worker.on('exit', code => console.log(`Worker exited by code ${code}`))
}

makeWorker(9999999n, 9999999n)
makeWorker(9999999n, 999999n)
makeWorker(99999999n, 9999999n)
makeWorker(99999n, 9999999n)

// setTimeout(() => {
//   worker.terminate()
// }, 3000)

setInterval(() => {
  console.log(Date.now())
}, 2000)

// setTimeout(() => {
//   console.log((9999999n ** 9999999n).toString().length)
// }, 2000)
