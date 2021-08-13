const Helpers = require('../../../helpers')
const UserModel = require('../models/index')
const { sign } = require('../../../utils/jwt')

const UserServices = (() => {
  const register = async userData => {
    try {
      const dbRes = await UserModel.create(userData)
      const { password, ...user } = dbRes.toObject()
      const token = sign({ user: user.id })

      return Helpers.triggerLoggerAndReturnResult({
        status: true,
        user,
        token,
        message: 'User registered with success!'
      })
    } catch (error) {
      return Helpers.triggerLoggerAndReturnResult(
        {
          status: false,
          error: error.message
        },
        'error'
      )
    }
  }

  const signin = async authorization => {
    try {
      const [, hash] = authorization.split(' ')
      const [email, password] = Buffer.from(hash, 'base64')
        .toString()
        .split(':')

      const [user] = await UserModel.find({ email, password })

      if (!user) throw { message: 'User or email invalid.' }

      const token = sign({
        user: user.id
      })

      return Helpers.triggerLoggerAndReturnResult({
        status: true,
        user,
        token,
        message: 'User login with success!'
      })
    } catch (error) {
      return Helpers.triggerLoggerAndReturnResult(
        {
          status: false,
          error: error.message
        },
        'error'
      )
    }
  }

  const me = async user => {
    return Helpers.triggerLoggerAndReturnResult({
      status: true,
      user,
      message: 'User exists'
    })
  }

  const forgotPassword = async userEmail => {
    try {
      const [, hash] = userEmail.split(' ')
      const [email] = Buffer.from(hash, 'base64').toString().split(':')
      const validateEmail = await UserModel.findOne({ email })

      if (!validateEmail) throw { message: 'Email not registered' }

      return Helpers.triggerLoggerAndReturnResult({
        status: true,
        data: validateEmail,
        message: 'A email will be send to you to reset your email!'
      })
    } catch (error) {
      return Helpers.triggerLoggerAndReturnResult(
        {
          status: false,
          error: error.message
        },
        'error'
      )
    }
  }

  return {
    register,
    signin,
    me,
    forgotPassword
  }
})()

module.exports = UserServices
