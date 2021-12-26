const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const ExpensesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    expirationDate: {
      type: String
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'UserModel',
      required: true
    }
  },
  {
    collection: 'Expenses',
    timestamps: true,
    toJSON: { virtuals: true, getters: true },
    toObject: { virtuals: true, getters: true }
  }
)

module.exports = mongoose.model('ExpensesModel', ExpensesSchema)
