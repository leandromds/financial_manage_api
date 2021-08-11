const pkg = require('../../../package.json')

const routes = router => {
  router.get('/', (req, res) => {
    res.status(200).send({
      status: true,
      message: 'Welcome to baseapi',
      version: pkg.version
    })
  })
}

module.exports = { routes }
