const articles = []

let autoIncrementId = 0

export default class Article {
  constructor ({ id, title, text }) {
    this.id = id
    this.title = title
    this.text = text
  }

  save () {
    if (this.id) {
      const article = articles.find(a => a.id === this.id)
      article.title = this.title
      article.text = this.text
    } else {
      articles.push({
        id: ++autoIncrementId,
        title: this.title,
        text: this.text
      })
    }
  }

  static findAll () {
    return articles
  }

  static find (id) {
    const data = articles.find(a => a.id === id)

    return data ? new Article(data) : undefined
  }

  static remove (id) {
    const articleIndex = articles.findIndex(a => a.id === id)

    if (articleIndex >= 0) {
      articles.splice(articleIndex, 1)
    }
  }

  remove () {
    Article.remove(this.id)
  }
}
