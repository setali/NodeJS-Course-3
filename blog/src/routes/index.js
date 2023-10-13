import express from 'express'
import general from './general'
import admin from './admin'
import article from './article'
import auth from './auth'

const router = express.Router()

router.use('/', general)
router.use('/', auth)
router.use('/article', article)
router.use('/admin', admin)

router.all('*', (req, res) => {
  res.status(404).send('Not Found')
})

export default router
