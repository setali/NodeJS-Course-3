import express from 'express'
import acl from '../../middlewares/acl'
import PersonController from '../../controllers/api/person'

const router = express.Router()

router.get('/', acl('USER'), PersonController.list)

export default router
