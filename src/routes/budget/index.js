const controller = require('./controllers')
const { auth } = require('../../utils/jwt')

const routes = router => {
  router.get('/budget', auth, controller.getCurrentBudget)
  router.post('/budget', auth, controller.createBudget)
  router.put('/budget', auth, controller.updateCurrentBudget)
}

module.exports = { routes }
