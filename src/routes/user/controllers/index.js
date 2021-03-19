const logger = require('../../../utils/logger')
const UserServices = require('../services')

const UserController = (() => {
  const register = async (req, res) => {
    try {
      const userData = req.body
      const {
        status,
        user,
        token,
        message
      } = await UserServices.register(userData)
      res.status(201).send({
        status,
        message,
        data: user,
        accessToken: token
      })
    } catch (error) {
      logger.error(error)
      return res.status(500).send({ status: false, message: 'Deu merda aqui' })
    }
  }

  const signin = async (req, res) => {
    try {
      const result = await UserServices.signin(req.headers.authorization)
      res.status(200).send(result)
    } catch (error) {
      logger.error(error)
      return res.status(500).send({ status: false, message: 'Deu merda aqui' })
    }
  }

  return {
    register,
    signin
  }
})()

module.exports = UserController
