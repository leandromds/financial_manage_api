const RevenuesServices = require('../services')

const RevenuesController = (() => {
  const addNewRevenue = async(req, res) => {
    try {
      const { auth, body: newRevenue } = req
      newRevenue.user = auth._id
      const result = await RevenuesServices.addNewRevenue(newRevenue)
      res.status(201).send({ ...result })
    } catch (error) {
      res.status(500).send({ message: 'Internal Server Error' })
    }
  }

  return {
    addNewRevenue
  }
})()

module.exports = RevenuesController