const logger = require('../logger')
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET
const option = {
  expiresIn: 86400
}
const UserModel = require('../../routes/user/models')

const sign = payload => jwt.sign(payload, secret, option)

const verify = token => jwt.verify(token, secret)

const auth = async (req, res, next) => {
  if (!req.headers?.authorization) return res.sendStatus(401)

  try {
    const [, token] = req.headers.authorization.split(' ')
    const payload = await verify(token)
    const user = await UserModel.findById(payload.user)

    if (!user) return res.sendStatus(401)

    req.auth = user

    next()
  } catch (error) {
    logger.error(error)
    return res.sendStatus(401)
  }
}

module.exports = {
  sign,
  verify,
  auth
}
