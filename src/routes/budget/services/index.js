const Helpers = require('../../../helpers')
const BugetModel = require('../model')
const UserModel = require('../../user/models')

const BudgetServices = (() => {
  const getCurrentBudget = async userId => {
    try {
      const budget = await UserModel.findById(userId).populate({
        path: 'budget',
        select: 'fixedCost emergencyFund investment personalEnjoyment'
      })

      return Helpers.triggerLoggerAndReturnResult({
        status: true,
        budget: budget.budget
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

  const createBudget = async budgetData => {
    try {
      console.log(budgetData)
      const budget = await BugetModel.create(budgetData)
      return Helpers.triggerLoggerAndReturnResult({
        status: true,
        budget,
        message: 'A budget was created with success!'
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

  const updateCurrentBudget = async budgetData => {
    const options = { new: true }
    const getUpdatedBudget = (err, doc) => {
      if (err) throw err
      return doc
    }

    try {
      const { id, ...newBudget } = budgetData
      const budget = await BugetModel.findByIdAndUpdate(
        id,
        newBudget,
        options,
        getUpdatedBudget
      )

      return Helpers.triggerLoggerAndReturnResult({
        status: true,
        budget,
        message: 'New budget was registered with success!'
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
    getCurrentBudget,
    createBudget,
    updateCurrentBudget
  }
})()

module.exports = BudgetServices
