const RevenuesController = require('./controllers')
const { auth } = require('../../utils/jwt')

const routes = router => { 
  router.get('/revenues', auth, RevenuesController.getAllRevenues)
  router.post('/revenues', auth, RevenuesController.addNewRevenue)
}

module.exports = { routes }