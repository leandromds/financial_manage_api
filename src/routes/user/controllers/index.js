const Helpers = require('../../../helpers')
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
      Helpers.triggerLoggerAndReturnResult(
        {
          status: false,
          error: error.message
        },
        'error'
      )
      res.status(500).send({ message: 'Internal Server Error' })
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
      Helpers.triggerLoggerAndReturnResult(
        {
          status: false,
          error: error.message
        },
        'error'
      )
      res.status(500).send({ message: 'Internal Server Error' })
    }
  }

  const forgotPassword = async (req, res) => {
    try {
      const {status, message} = await UserServices.forgotPassword(req.headers.authorization)
      res.status(200).send({ status, message }) 
    } catch (error) {
      Helpers.triggerLoggerAndReturnResult(
        {
          status: false,
          error: error.message
        },
        'error'
      )
      res.status(500).send({ message: 'Internal Server Error' })
    }
  }

  return {
    register,
    signin,
    me,
    forgotPassword
  }
})()

module.exports = UserController
