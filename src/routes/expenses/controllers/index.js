const Helpers = require('../../../helpers')
const ExpensesServices = require('../services')

const ExpensesController = (() => {
  const getAllExpenses = async (req, res) => {
    try {
      const userId = req.auth._id
      const result = await ExpensesServices.getAllExpenses(userId)
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

  const addNewExpense = async (req, res) => {
    try {
      const { auth, body: expense } = req
      expense.user = auth._id
      const result = await ExpensesServices.addNewExpense(expense)
      res.status(201).send({ ...result })
    } catch (error) {
      Helpers.triggerLoggerAndReturnResult(
        {
          status: false,
          error: error.message
        },
        'error'
      )
      res.sendStatus(500)
    }
  }

  const updateExpense = async (req, res) => {
    try {
      const result = await ExpensesServices.updateExpense(req.body)
      res.status(201).send({ ...result })
    } catch (error) {
      Helpers.triggerLoggerAndReturnResult(
        {
          status: false,
          error: error.message
        },
        'error'
      )
      res.sendStatus(500)
    }
  }

  const deleteExpense = async (req, res) => {
    try {
      const expenseId = req.body.id
      const result = await ExpensesServices.deleteExpense(expenseId)
      res.status(201).send({ ...result })
    } catch (error) {
      Helpers.triggerLoggerAndReturnResult(
        {
          status: false,
          error: error.message
        },
        'error'
      )
      res.sendStatus(500)
    }
  }

  return {
    getAllExpenses,
    addNewExpense,
    updateExpense,
    deleteExpense
  }
})()

module.exports = ExpensesController
