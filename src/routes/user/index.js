const controller = require('./controllers')

const routes = router => {
  router.post('/register', controller.register)
  router.get('/signin', controller.signin)
}

module.exports = { routes }
