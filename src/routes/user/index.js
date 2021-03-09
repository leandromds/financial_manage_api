const routes = router => {
  router.post('/signin', (req, res) => {
    const userData = req.body
    res.status(200).send({
      ...userData,
      routeName: 'signin'
    })
  })

  router.post('/signout', (req, res) => {
    const userData = req.body
    res.status(200).send({
      ...userData,
      routeName: 'signout'
    })
  })

  router.post('/register', (req, res) => {
    const userData = req.body
    res.status(200).send({
      ...userData,
      routeName: 'register'
    })
  })
}

module.exports = { routes }
