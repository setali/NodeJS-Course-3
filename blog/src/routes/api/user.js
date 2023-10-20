import express from 'express'
import UserController from '../../controllers/api/user'

const router = express.Router()

router.get('/', UserController.user)

export default router
