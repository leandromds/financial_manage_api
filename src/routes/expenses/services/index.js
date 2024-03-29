const Helpers = require('../../../helpers')
const ExpensesModel = require('../model')
const UserModel = require('../../user/models')

const ExpensesServices = (() => {
  const getAllExpenses = async userId => {
    try {
      const expenses = await UserModel.findById(userId).populate({
        path: 'expenses',
        select: 'title category type value date'
      })
      return Helpers.triggerLoggerAndReturnResult({
        status: true,
        expenses: expenses.expenses
      })
    } catch (error) {
      return Helpers.triggerLoggerAndReturnResult(
        {
          status: false,
          error: error.message
        },
        'error'
      )
    }
  }

  const addNewExpense = async newExpense => {
    try {
      const expense = await ExpensesModel.create(newExpense)
      return Helpers.triggerLoggerAndReturnResult({
        status: true,
        expense,
        message: 'Expense registered with success!'
      })
    } catch (error) {
      return Helpers.triggerLoggerAndReturnResult(
        {
          status: false,
          error: error.message
        },
        'error'
      )
    }
  }

  const updateExpense = async expense => {
    const options = { new: true }
    const getUpdatedExpense = (err, doc) => {
      if (err) throw err
      return doc
    }

    try {
      const { id, ...newData } = expense
      const updatedExpense = await ExpensesModel.findByIdAndUpdate(
        id,
        newData,
        options,
        getUpdatedExpense
      )

      return Helpers.triggerLoggerAndReturnResult({
        status: true,
        expense: updatedExpense,
        message: 'Expense updated with success!'
      })
    } catch (error) {
      return Helpers.triggerLoggerAndReturnResult(
        {
          status: false,
          error: error.message
        },
        'error'
      )
    }
  }

  const deleteExpense = async expenseId => {
    try {
      const expenseDeleted = await ExpensesModel.findByIdAndDelete(expenseId)
      return Helpers.triggerLoggerAndReturnResult({
        status: true,
        expense: expenseDeleted,
        message: 'Expense was deleted with success!'
      })
    } catch (error) {
      return Helpers.triggerLoggerAndReturnResult(
        {
          status: false,
          error: error.message
        },
        'error'
      )
    }
  }

  return {
    getAllExpenses,
    addNewExpense,
    updateExpense,
    deleteExpense
  }
})()

module.exports = ExpensesServices
