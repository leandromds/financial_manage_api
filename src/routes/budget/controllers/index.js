const Helpers = require('../../../helpers')
const BudgetServices = require('../services')

const BudgetController = (() => {
  const getCurrentBudget = async (req, res) => {
    try {
      const userId = req.auth._id
      const result = await BudgetServices.getCurrentBudget(userId)
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

  const createBudget = async (req, res) => {
    try {
      const { auth, body: budget } = req
      budget.user = auth._id
      const result = await BudgetServices.createBudget(budget)
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

  const updateCurrentBudget = async (req, res) => {
    try {
      const result = await BudgetServices.updateCurrentBudget(req.body)
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
    getCurrentBudget,
    createBudget,
    updateCurrentBudget
  }
})()

module.exports = BudgetController
