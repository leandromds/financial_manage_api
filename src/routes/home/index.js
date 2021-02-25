const pkg = require('../../../package.json')

const routes = router => {
  router.get('/', (req, res) => {
    res.status(200).send({
      message: 'Welcome to baseapi',
      version: pkg.version
    })
  })
}

module.exports = { routes }
