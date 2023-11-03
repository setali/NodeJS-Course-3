import express from 'express'
import acl from '../../middlewares/acl'
import MessageController from '../../controllers/api/message'

const router = express.Router()

router.get('/', acl('USER'), MessageController.list)

export default router
