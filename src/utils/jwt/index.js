const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET
const option = {
  expiresIn: 86400
}

const sign = payload => jwt.sign(payload, secret, option)

const verify = token => jwt.verify(token, secret)

module.exports = {
  sign,
  verify
}
