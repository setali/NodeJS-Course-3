import express from 'express'
import FileController from '../../controllers/api/file'
import uploader from '../../middlewares/uploader'
import acl from '../../middlewares/acl'

const router = express.Router()

router.post('/', acl('WRITER'), uploader.single('file'), FileController.upload)

export default router
