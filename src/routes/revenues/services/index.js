const Helpers = require('../../../helpers');
const RevenuesModel = require('../models');
const UserModel = require('../../user/models');

const RevenuesServices = (() => {
  const getAllRevenues = async (userId) => {
    try {
      const revenues = await UserModel.findById(userId).populate({
        path: 'revenues',
        select: 'title recurrence value date',
      });
      return Helpers.triggerLoggerAndReturnResult({
        status: true,
        revenues: revenues.revenues,
      });
    } catch (error) {
      return Helpers.triggerLoggerAndReturnResult(
        {
          status: false,
          error: error.message,
        },
        'error'
      );
    }
  };

  const addNewRevenue = async (newRevenue) => {
    try {
      const revenue = await RevenuesModel.create(newRevenue);
      return Helpers.triggerLoggerAndReturnResult({
        status: true,
        revenue,
        message: 'Revenue registered with success!',
      });
    } catch (error) {
      return Helpers.triggerLoggerAndReturnResult(
        {
          status: false,
          error: error.message,
        },
        'error'
      );
    }
  };

  const updateRevenue = async (revenue) => {
    const options = { new: true };
    const getUpdatedRevenue = (err, doc) => {
      if (err) throw err;
      return doc;
    };

    try {
      const { id, ...newData } = revenue;
      const updatedRevenue = await RevenuesModel.findByIdAndUpdate(
        id,
        newData,
        options,
        getUpdatedRevenue
      );
      return Helpers.triggerLoggerAndReturnResult({
        status: true,
        revenue: updatedRevenue,
        message: 'Revenue updated with success!',
      });
    } catch (error) {
      return Helpers.triggerLoggerAndReturnResult(
        {
          status: false,
          error: error.message,
        },
        'error'
      );
    }
  };

  const deleteRevenue = async (revenueId) => {
    try {
      const revenueDeleted = await RevenuesModel.findByIdAndDelete(revenueId);
      return Helpers.triggerLoggerAndReturnResult({
        status: true,
        expense: revenueDeleted,
        message: 'Revenue was deleted with success!',
      });
    } catch (error) {
      return Helpers.triggerLoggerAndReturnResult(
        {
          status: false,
          error: error.message,
        },
        'error'
      );
    }
  };

  return {
    getAllRevenues,
    addNewRevenue,
    updateRevenue,
    deleteRevenue,
  };
})();

module.exports = RevenuesServices;
