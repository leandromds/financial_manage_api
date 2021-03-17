const logger = require('../../../config/logger')
const UserServices = require('../services')

const UserController = (() => {
  const register = async (req, res) => {
    try {
      const userData = req.body
      const userRecord = await UserServices.register(userData)
      res.status(201).send({
        status: true,
        message: 'User registered with success!',
        data: userRecord
      })
    } catch (error) {
      logger.error(error)
      return res.status(500).send({ status: false, message: 'Deu merda aqui' })
    }
  }

  return {
    register
  }
})()

module.exports = UserController
