import jwt from 'jsonwebtoken'
import { BadRequestError } from '../utils/errors'
import User from '../models/user'

export default (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1]

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (err) {
          throw new BadRequestError(err)
        }

        User.find(payload.id).then(user => {
          req.user = user
          next()
        })
      })
    }
  } else {
    req.user = req.session.user
    next()
  }
}
