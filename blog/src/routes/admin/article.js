import express from 'express'
import ArticleController from '../../controllers/admin/article'

const router = express.Router()

router.get('', ArticleController.list)
// router.get('/:id([0-9]+)', ArticleController.get)
router.get('/:id(\\d+)', ArticleController.get)
router.get('/create', ArticleController.create)
router.post('', ArticleController.add)
router.get('/:id(\\d+)/edit', ArticleController.edit)
router.put('/:id(\\d+)', ArticleController.update)

export default router

// RESTFUL API

// GET      /article        List
// GET      /article/:id    Get an article
// POST     /article        Create an article
// PUT      /article/:id    Full update an article
// PATCH    /article/:id    Partial update an article
// DELETE   /article/:id    Delete an article
