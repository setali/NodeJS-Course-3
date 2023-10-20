import Article from '../models/article'
import { NotFoundError } from '../utils/errors'

const PAGE_SIZE = 3

class ArticleController {
  async list (req, res) {
    const { page = 1 } = req.query

    const { count: total, rows: articles } = await Article.findAndCountAll({
      include: ['user'],
      limit: PAGE_SIZE,
      order: [['id', 'DESC']],
      offset: (page - 1) * PAGE_SIZE
    })

    res.render('article/list', {
      title: 'Articles',
      articles,
      user: req.user,
      total,
      page: +page,
      pages: Math.ceil(total / PAGE_SIZE)
    })
  }

  async get (req, res) {
    const { id } = req.params

    const article = await Article.find(+id)

    if (!article) {
      throw new NotFoundError('Article not found')
    }

    res.render('article/show', {
      title: article.title,
      article,
      user: req.user
    })
  }
}

export default new ArticleController()
