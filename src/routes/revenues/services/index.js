const Helpers = require('../../../helpers')
const RevenuesModel = require('../models')
const UserModel = require('../../user/models')

const RevenuesServices = (() => {
  const getAllRevenues = async userId => {
    try {
      const revenues = await UserModel.findById(userId).populate({
        path: 'revenues',
        select: 'title recurrence value date'
      })
      return Helpers.triggerLoggerAndReturnResult({
        status: true,
        revenues: revenues.revenues
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

  const addNewRevenue = async newRevenue => {
    try {
      const revenue = await RevenuesModel.create(newRevenue)
      return Helpers.triggerLoggerAndReturnResult({
        status: true,
        revenue,
        message: 'Revenue registered with success!'
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
    getAllRevenues,
    addNewRevenue
  }
})()

module.exports = RevenuesServices
