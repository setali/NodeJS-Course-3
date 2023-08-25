const http = require('http')
const cluster = require('cluster')
const os = require('os')

const cpuCount = os.cpus().length

process.title = `Node - cluster - ${process.pid} ${cluster.isMaster}`

if (cluster.isMaster) {
  for (let i = 0; i < cpuCount; i++) {
    cluster.fork()
  }
} else {
  // Workers can share TCP connection port
  http
    .createServer((req, res) => {
      res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500')
      res.end(String(process.pid))
    })
    .listen(3000, () => {
      console.log('Server is Running')
    })
}
