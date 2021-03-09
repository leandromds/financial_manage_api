const routes = router => {
  router.get('/signin', (req, res) => {
    res.status(200).send({
      endpoint: 'SignIn',
      message: 'Work'
    })
  })
}

module.exports = { routes }
