const logger = require('../../../config/logger')
const UserModel = require('../models/index')
const { sign } = require('../../../utils/jwt')

const UserServices = (() => {
  const register = async (userData) => {
    const dbRes = await UserModel.create(userData)
    const { password, ...user } = dbRes.toObject()
    const token = sign({ user: user.id })

    logger.info({ user, token })
    return { user, token }
  }

  return {
    register
  }
})()

module.exports = UserServices
