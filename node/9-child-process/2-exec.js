const { exec } = require('child_process')

exec('ls -l .. | grep .js', (error, stdout, stderr) => {
  if (error) {
    console.log(stderr)
  } else {
    console.log(stdout)
  }
})
