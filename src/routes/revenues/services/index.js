const Helpers = require('../../../helpers')
const RevenuesModel = require('../models')
const UserModel = require('../../user/models')

const RevenuesServices = (() => {
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
    addNewRevenue
  }
})()

module.exports = RevenuesServices
