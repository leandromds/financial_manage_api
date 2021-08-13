const logger = require('../logger')
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET
const option = {
  expiresIn: 86400
}
const UserModel = require('../../routes/user/models')

const sign = payload => jwt.sign(payload, secret, option)

const verify = token => {
  try {
    const decoded = jwt.verify(token, secret)
    return decoded
  } catch (error) {
    return false
  }
}

const errorMessage = {
  status: false,
  message: 'Authentication error. Token required.'
}

const auth = async (req, res, next) => {
  if (!req.headers?.authorization) return res.status(403).send(errorMessage)

  try {
    const [, token] = req.headers.authorization.split(' ')

    if (!token) return res.status(403).send(errorMessage)

    const payload = await verify(token)

    if (!payload) {
      errorMessage.message = 'Authentication error. Token invalid.'
      return res.status(401).send(errorMessage)
    }

    const user = await UserModel.findById(payload.user)

    if (!user.email) {
      errorMessage.message = 'Authentication error. User not registered.'
      return res.status(401).send(errorMessage)
    }

    req.auth = user

    next()
  } catch (error) {
    logger.error(error)
    return res.status(401).send(errorMessage)
  }
}

module.exports = {
  sign,
  verify,
  auth
}
