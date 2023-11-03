import '../src/config/loadTestEnv'
import supertest from 'supertest'
import { bootstrap } from '../src/app'
import User from '../src/models/user'
import Article from '../src/models/article'
import { log, logger, mongoTransporter } from '../src/utils/logger'
import { Op } from 'sequelize'

const ARTICLE_URL = '/api/admin/article'

let request, user, article

const fakeUser = {
  username: 'ali',
  email: 'ali@gmail.com',
  password: 'ali'
}

const fakeArticle = {
  title: 'Article Title',
  text: 'Article Text',
  image: 'Article Image'
}

beforeAll(async () => {
  const server = await bootstrap()

  request = supertest(server)

  await request.post('/register').send(fakeUser)

  const response = await request
    .post('/api/login')
    .send({ username: fakeUser.username, password: fakeUser.password })

  user = response.body

  await User.update(
    { role: 'ADMIN' },
    { where: { username: fakeUser.username } }
  )
})

afterAll(async () => {
  await User.destroy({ where: { username: fakeUser.username } })

  await Article.destroy({ where: { id: { [Op.gt]: 0 } } })

  logger.clear()
  logger.remove(mongoTransporter)
})

describe('Admin article api', () => {
  test('list article 401', async () => {
    const response = await request.get(ARTICLE_URL)
    expect(response.statusCode).toBe(401)
  })

  test('Admin article 200', async () => {
    const response = await request
      .get(ARTICLE_URL)
      .set('Authorization', `Bearer ${user.token}`)

    expect(response.statusCode).toBe(200)
  })

  test('Create article', async () => {
    const response = await request
      .post(ARTICLE_URL)
      .set('Authorization', `Bearer ${user.token}`)
      .send(fakeArticle)

    article = response.body

    expect(response.statusCode).toBe(201)
    checkArticle()
  })

  test('Get article', async () => {
    const response = await request
      .get(`${ARTICLE_URL}/${article.id}`)
      .set('Authorization', `Bearer ${user.token}`)

    expect(response.statusCode).toBe(200)
    checkArticle()
  })

  test('Update article', async () => {
    const response = await request
      .put(`${ARTICLE_URL}/${article.id}`)
      .set('Authorization', `Bearer ${user.token}`)
      .send({ ...article, title: 'New article' })

    expect(response.statusCode).toBe(200)
    expect(response.body.title).toBe('New article')
  })

  test('Delete article', async () => {
    const response = await request
      .delete(`${ARTICLE_URL}/${article.id}`)
      .set('Authorization', `Bearer ${user.token}`)

    expect(response.statusCode).toBe(200)
  })

  //   test('Get deleted article', async () => {
  //     const response = await request
  //       .get(`${ARTICLE_URL}/${article.id}`)
  //       .set('Authorization', `Bearer ${user.token}`)

  //     console.log('=======>', response)

  //     expect(response.statusCode).toBe(404)
  //   })
})

function checkArticle () {
  expect(article.title).toBe(fakeArticle.title)
  expect(article.text).toBe(fakeArticle.text)
  expect(article.image).toBe(fakeArticle.image)
  expect(article).toHaveProperty('id')
}
