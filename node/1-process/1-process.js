// UV_THREADPOOL_SIZE = 10

setInterval(() => {
  console.log(Date.now())
}, 1000)

console.log(process.pid)
console.log(process.ppid)
console.log(process.cwd())

process.title = 'Anisa Course'

// console.log(process.config)
console.log(process.env.USER)

console.log(process.uptime())

console.log(process.cpuUsage())

console.log(process.resourceUsage())

console.log(process.memoryUsage())

// process.on('uncaughtException', ex => {
//   console.log(ex)
// })

process.on('exit', code => {
  console.log(process.exitCode)
  console.log(code)
})

// setTimeout(() => {
//   //   process.kill(process.pid)
//   throw new Error('Anisa Course')
// }, 6000)
