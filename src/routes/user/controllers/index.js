const logger = require('../../../utils/logger')
const UserServices = require('../services')

const UserController = (() => {
  const register = async (req, res) => {
    try {
      const userData = req.body
      const { status, user, token, message } = await UserServices.register(
        userData
      )
      res.status(201).send({
        status,
        message,
        data: user,
        accessToken: token
      })
    } catch (error) {
      logger.error(error)
      return res.status(401).send({ 
        status: false,
        message: error.message
      })
    }
  }

  const signin = async (req, res) => {
    try {
      const result = await UserServices.signin(req.headers.authorization)
      res.status(200).send(result)
    } catch (error) {
      logger.error(error)
      return res.status(500).send({
        status: false,
        message: 'Username or Password Invalid'
      })
    }
  }

  const me = async (req, res) => {
    try {
      const result = await UserServices.me(req.auth)
      res.status(200).send(result)
    } catch (error) {
      logger.error(error)
      return res.status(500).send({
        status: false,
        message: 'Username or Password Invalid'
      })
    }
  }

  return {
    register,
    signin,
    me
  }
})()

module.exports = UserController
