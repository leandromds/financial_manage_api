const controller = require('./controllers')
const { auth } = require('../../utils/jwt')

const routes = router => {
  router.post('/register', controller.register)
  router.get('/signin', controller.signin)
  router.get('/me', auth, controller.me)
}

module.exports = { routes }
