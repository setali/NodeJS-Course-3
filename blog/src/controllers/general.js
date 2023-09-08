export function home (req, res) {
  return res.render('index', {
    title: 'Home Page',
    content: 'Home Page Content'
  })
}

export function about (req, res) {
  return res.render('about', {
    title: 'About Us Page',
    content: 'About US Page Content'
  })
}

export function contact (req, res) {
  return res.render('contact', {
    title: 'Contact Us Page',
    content: 'Contact US Page Content'
  })
}
