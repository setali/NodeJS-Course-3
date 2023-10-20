import express from 'express'
import general from './general'
import admin from './admin'
import article from './article'
import auth from './auth'
import api from './api'

const router = express.Router()

router.use('/', general)
router.use('/', auth)
router.use('/article', article)
router.use('/admin', admin)
router.use('/api', api)

router.all('*', (req, res) => {
  res.status(404).send('Not Found')
})

export default router
