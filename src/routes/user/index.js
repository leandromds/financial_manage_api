const controller = require('./controllers')

const routes = router => {
  router.post('/register', controller.register)
}

module.exports = { routes }
