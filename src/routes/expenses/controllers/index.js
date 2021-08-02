const logger = require('../../../utils/logger')

const ExpensesController = (() => {
  const getAllExpenses = async (req, res) => {
    try {
      const result = await ExpensesServices.getAllExpenses(req.headers.authorization)
    } catch (error) {
      
    }
  }
})