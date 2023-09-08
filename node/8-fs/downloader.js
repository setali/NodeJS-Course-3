const path = require('path')
const fs = require('fs')
const http = require('https')

const filePath = path.resolve(__dirname, 'links.txt')
const data = fs.readFileSync(filePath, 'utf-8')

const files = data.split('\n')

const dir = path.resolve(__dirname, 'downloads')

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir)
}

;(async function () {
  for (const file of files) {
    const downloadedFile = await downloadFile(file, dir)
    console.log(`${downloadedFile.name} downloaded.`)
  }
})()

function downloadFile (file, dir) {
  return new Promise((resolve, reject) => {
    const fileUrl = decodeURI(file)

    const fileName = path.basename(fileUrl).replace(/\s/g, '')

    const filePath = path.resolve(dir, fileName)

    const fileStream = fs.createWriteStream(filePath)

    http.get(file, response => {
      response.pipe(fileStream)

      response.on('end', () => {
        fileStream.close()
        resolve({ name: fileName, path: filePath, url: fileUrl })
      })
    })
  })
}

// const path = require('path')
// const fs = require('fs')
// const http = require('https')

// const filePath = path.resolve(__dirname, 'links.txt')
// const data = fs.readFileSync(filePath, 'utf-8')

// const files = data.split('\n')

// const dir = path.resolve(__dirname, 'downloads')

// if (!fs.existsSync(dir)) {
//   fs.mkdirSync(dir)
// }

// files.forEach(file => {
//   const fileUrl = decodeURI(file)

//   const fileName = path.basename(fileUrl).replace(/\s/g, '')

//   const filePath = path.resolve(dir, fileName)

//   const fileStream = fs.createWriteStream(filePath)

//   http.get(file, response => {
//     response.pipe(fileStream)

//     response.on('end', () => {
//         fileStream.close()
//         console.log(`${fileName} Completed`)
//     })
//   })
// })
