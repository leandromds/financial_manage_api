const RevenuesController = require('./controllers')
const { auth } = require('../../utils/jwt')

const routes = router => { 
  router.get('/revenues', auth, RevenuesController.getAllRevenues)
  router.post('/revenues', auth, RevenuesController.addNewRevenue)
  router.put('/revenues', auth, RevenuesController.updateRevenue)
  router.delete('/revenues', auth, RevenuesController.deleteRevenue)
}

module.exports = { routes }