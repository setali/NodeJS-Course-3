import express from 'express'
import ArticleController from '../../controllers/admin/article'

const router = express.Router()

router.get('', ArticleController.list)
router.get('/create', ArticleController.create)
router.post('', ArticleController.add)

export default router

// RESTFUL API

// GET      /article        List
// GET      /article/:id    Get an article
// POST     /article        Create an article
// PUT      /article/:id    Full update an article
// PATCH    /article/:id    Partial update an article
// DELETE   /article/:id    Delete an article
