const controller = require('./controllers')
const { auth } = require('../../utils/jwt')

const routes = router => {
  router.get('/expenses', auth, (req, res) => {
    res.status(200).send({
      message: 'expenses endPoint'
    })
  })
}

module.exports = { routes }
