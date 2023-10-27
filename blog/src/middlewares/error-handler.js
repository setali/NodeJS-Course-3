import { JsonSchemaValidation } from 'express-jsonschema'
import { log } from '../utils/logger'

export default (err, req, res, next) => {
  console.log(err.message)
  const status = err.status ?? 500

  log({
    level: 'error',
    message: err.message,
    metadata: { user: req.user, url: req.url, status }
  })

  if (err instanceof JsonSchemaValidation) {
    return res.status(400).json({
      code: 400,
      message: 'Validation error',
      fields: err.validations
    })
  }

  const message =
    err.status < 500 || process.env.NODE_ENV === 'development'
      ? err.message
      : `Server Error: Please call to admin.`

  if (req.url.startsWith('/api')) {
    res.status(status).json({
      code: status,
      message
    })
  } else {
    res.status(status).render('error', {
      title: `Error ${status}`,
      content: message,
      user: req.user
    })
  }
}
