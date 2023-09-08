import path from 'path'

export function home (req, res) {
  const filePath = path.resolve(__dirname, '..', 'views', 'index.html')

  return res.sendFile(filePath)
}

export function about (req, res) {
  return res.send('About Us')
}

export function contact (req, res) {
  return res.send('Contact Us')
}
