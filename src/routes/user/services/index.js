const Helpers = require('../../../helpers')
const UserModel = require('../models/index')
const { sign } = require('../../../utils/jwt')

const UserServices = (() => {
  const register = async (userData) => {
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
        { status: false, error },
        'error'
      )
    }
  }

  const signin = async (authorization) => {
    try {
      const [, hash] = authorization.split(' ')
      const [email, password] = Buffer.from(hash, 'base64')
        .toString()
        .split(':')

      const [ user ] = await UserModel.find({ email, password })
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
        { status: false, error },
        'error'
      )
    }
  }

  const me = async (user) => {
    return Helpers.triggerLoggerAndReturnResult({
      status: true,
      user,
      message: 'User exists'
    })
  }

  return {
    register,
    signin,
    me
  }
})()

module.exports = UserServices
