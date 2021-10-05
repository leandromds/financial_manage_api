const crypto = require('crypto')
const Helpers = require('../../../helpers')
const UserModel = require('../models/index')
const mailer = require('../../../utils/mail')
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

      if (!user) throw new Error({ message: 'User or email invalid.' })

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
      const [email] = Buffer.from(hash, 'base64')
        .toString()
        .split(':')
      const user = await UserModel.findOne({ email })

      if (!user) throw new Error({ message: 'Email not registered' })

      const token = crypto.randomBytes(32).toString('hex')
      const now = new Date()
      now.setHours(now.getHours() + 1)

      await UserModel.findByIdAndUpdate(user.id, {
        $set: {
          passwordResetToken: token,
          passwordResetExpires: now
        }
      })

      await mailer.sendMail({
        name: user.userName,
        link: `/forgot-password/${user.id}/${token}`,
        test: true
      })

      return Helpers.triggerLoggerAndReturnResult({
        status: true,
        data: user,
        message: 'A email will be send to you to reset your email!'
      })
    } catch (error) {
      return Helpers.triggerLoggerAndReturnResult(
        {
          status: false,
          error
        },
        'error'
      )
    }
  }

  const resetPassword = async userData => {
    try {
      const { userId, token, password } = userData
      const now = new Date()
      const user = await UserModel.findById(userId).select(
        'passwordResetToken passwordResetExpires'
      )

      if (!user) throw new Error({ message: 'Email not registered' })

      if (token !== user.passwordResetToken) {
        throw new Error({ message: 'Token invalid' })
      }

      if (now > user.passwordResetExpires) {
        throw new Error({
          message: 'Token expired, generate new one'
        })
      }

      user.password = password

      await user.save()

      return Helpers.triggerLoggerAndReturnResult({
        status: true,
        message: 'New password saved with success!'
      })
    } catch (error) {
      return Helpers.triggerLoggerAndReturnResult(
        {
          status: false,
          error
        },
        'error'
      )
    }
  }

  return {
    register,
    signin,
    me,
    forgotPassword,
    resetPassword
  }
})()

module.exports = UserServices
