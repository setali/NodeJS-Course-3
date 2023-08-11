const minimist = require('minimist')

const result = minimist(process.argv.splice(2))

console.log(result)
console.log(result.name)
console.log(result._)
