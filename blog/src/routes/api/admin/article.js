import express from 'express'
import ArticleController from '../../../controllers/api/admin/article'
import acl from '../../../middlewares/acl'
import { validate } from 'express-jsonschema'
import { articleSchema as schema } from '../../../validators/article'

const router = express.Router()

router.get('', acl('WRITER'), ArticleController.list)
// router.get('/:id([0-9]+)', ArticleController.get)
router.get('/:id(\\d+)', acl('WRITER'), ArticleController.get)
router.post('', acl('WRITER'), validate(schema), ArticleController.add)
router.put(
  '/:id(\\d+)',
  acl('MODERATOR'),
  validate(schema),
  ArticleController.update
)
router.delete('/:id(\\d+)', acl('ADMIN'), ArticleController.remove)

export default router

// RESTFUL API

// GET      /article        List
// GET      /article/:id    Get an article
// POST     /article        Create an article
// PUT      /article/:id    Full update an article
// PATCH    /article/:id    Partial update an article
// DELETE   /article/:id    Delete an article
