const Helpers = require('../../../helpers')
const RevenuesServices = require('../services')

const RevenuesController = (() => {
  const getAllRevenues = async (req, res) => {
    try {
      const userId = req.auth._id
      const result = await RevenuesServices.getAllRevenues(userId)
      res.status(200).send({ ...result })
    } catch (error) {
      Helpers.triggerLoggerAndReturnResult(
        {
          status: false,
          error: error.message
        },
        'error'
      )
     res.status(500).send({ message: 'Internal Server Error' }) 
    }
  }

  const addNewRevenue = async(req, res) => {
    try {
      const { auth, body: newRevenue } = req
      newRevenue.user = auth._id
      const result = await RevenuesServices.addNewRevenue(newRevenue)
      res.status(201).send({ ...result })
    } catch (error) {
      Helpers.triggerLoggerAndReturnResult(
        {
          status: false,
          error: error.message
        },
        'error'
      )
      res.status(500).send({ message: 'Internal Server Error' })
    }
  }

  return {
    getAllRevenues,
    addNewRevenue
  }
})()

module.exports = RevenuesController