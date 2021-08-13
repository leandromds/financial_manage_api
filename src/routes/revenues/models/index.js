const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const RevenuesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    Recurrence: {
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
    user: {
      type: Schema.Types.ObjectId,
      ref: 'UserModel',
      required: true
    }
  },
  {
    collection: 'Revenues',
    timestamps: true,
    toJSON: { virtuals: true, getters: true },
    toObject: { virtuals: true, getters: true }
  }
)

module.exports = mongoose.model('RevenuesModel', RevenuesSchema)
