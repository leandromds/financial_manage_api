const UserController = require('./controllers')
const { auth } = require('../../utils/jwt')

const routes = router => {
  router.post('/register', UserController.register)
  router.get('/signin', UserController.signin)
  router.get('/forgot-password', UserController.forgotPassword)
  router.get('/me', auth, UserController.me)
}

module.exports = { routes }
