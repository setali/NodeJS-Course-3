const { execFile } = require('child_process')

// execFile('node', ['--version'], (error, stdout, stderr) => {
execFile('ls', ['-l', '../'], (error, stdout, stderr) => {
  if (error) {
    console.log(stderr)
  } else {
    console.log(stdout)
  }
})
