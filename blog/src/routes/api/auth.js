import express from 'express'
import AuthController from '../../controllers/api/auth'
import { loginSchema as schema } from '../../validators/auth'
import { validate } from 'express-jsonschema'

const router = express.Router()

router.post('/login', validate(schema), AuthController.login)

export default router
