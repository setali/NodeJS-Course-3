import jwt from 'jsonwebtoken'
import User from '../../models/user'
import bcrypt from 'bcrypt'
import { BadRequestError } from '../../utils/errors'
import { log } from '../../utils/logger'

class AuthController {
  async login (req, res) {
    const { username, password } = req.body

    if (!username || !password) {
      throw new BadRequestError('username and password is required!')
    }

    const user = await User.scope('withPassword').findOne({
      where: { username }
    })

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new BadRequestError('Credential error')
    }

    const token = jwt.sign(
      { id: user.id, username: username },
      process.env.JWT_SECRET,
      {
        expiresIn: '10000s'
      }
    )

    log({
      message: 'user:api-login',
      metadata: { user: { ...user, password: undefined } }
    })

    res.json({
      token,
      ...user.toJSON(),
      password: undefined
    })
  }
}

export default new AuthController()
