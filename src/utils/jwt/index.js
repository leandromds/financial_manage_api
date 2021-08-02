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
  const [,token] = req.headers.authorization.split(' ')
  try {
    const payload = await verify(token)
    const user = await UserModel.findById(payload.user)

    if (!user) return res.send(401)

    req.auth = user
    
    next()
  } catch (error) {
    logger.error(error)
    return res.status(4021).send({ status: false, message: 'Deu merda aqui' })
  }
}

module.exports = {
  sign,
  verify,
  auth
}
