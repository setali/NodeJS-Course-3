import Article from '../models/article'

export async function home (req, res) {
  const articles = await Article.findAll({ limit: 4, order: [['id', 'desc']] })

  return res.render('index', {
    title: 'Home Page',
    content: 'Home Page Content',
    user: req.user,
    articles
  })
}

export function about (req, res) {
  return res.render('about', {
    title: 'About Us Page',
    content: 'About US Page Content',
    user: req.user
  })
}

export function contact (req, res) {
  return res.render('contact', {
    title: 'Contact Us Page',
    content: 'Contact US Page Content',
    user: req.user
  })
}
