const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const BudgetSchema = new mongoose.Schema(
  {
    fixedCost: {
      type: Number,
      required: true
    },
    emergencyFund: {
      type: Number,
      required: true
    },
    investment: {
      type: Number,
      required: true
    },
    personalEnjoyment: {
      type: Number,
      required: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'UserModel',
      required: true
    }
  },
  {
    collection: 'Budget',
    timestamps: true,
    toJSON: { virtuals: true, getters: true },
    toObject: { virtuals: true, getters: true }
  }
)

module.exports = mongoose.model('BudgetModel', BudgetSchema)
