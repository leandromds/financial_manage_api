const logger = require('../../../config/logger')
const UserModel = require('../models/index')
const { sign } = require('../../../utils/jwt')

const UserServices = (() => {
  const register = async (userData) => {
    try {
      const dbRes = await UserModel.create(userData)
      const { password, ...user } = dbRes.toObject()
      const token = sign({ user: user.id })

      logger.info({
        status: true,
        user,
        token,
        message: 'User registered with success!'
      })

      return {
        status: true,
        user,
        token,
        message: 'User registered with success!'
      }
    } catch (error) {
      logger.error(error)
      return {
        status: false,
        error
      }
    }
  }

  const signin = async (authorization) => {
    try {
      const [, hash] = authorization.split(' ')
      const [email, password] = Buffer.from(hash, 'base64')
        .toString()
        .split(':')

      const user = await UserModel.find({ email, password })
      const token = sign({ user: user.id })

      logger.info({
        status: true,
        user,
        token,
        message: 'User login with success!'
      })

      return {
        status: true,
        user,
        token,
        message: 'User login with success!'
      }
    } catch (error) {
      logger.error(error)
      return {
        status: false,
        error
      }
    }
  }

  return {
    register,
    signin
  }
})()

module.exports = UserServices
