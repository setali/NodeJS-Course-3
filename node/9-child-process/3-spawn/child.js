process.title = 'Node - Child'

console.log(`Child ID: `, process.pid)
console.log(`Parent ID: `, process.ppid)

setInterval(() => {
  console.log('salam')
}, 1000)

// setTimeout(() => {
//   throw new Error('My child error')
// }, 5000)

// setTimeout(() => {
//     process.exit()
// }, 5000)
