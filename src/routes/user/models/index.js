const mongoose = require('mongoose')
const crypto = require('crypto')

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      select: false,
      set: value =>
        crypto
          .createHash('md5')
          .update(value)
          .digest('hex')
    }
  },
  {
    collection: 'Users',
    timestamps: true,
    toJSON: { virtuals: true, getters: true },
    toObject: { virtuals: true, getters: true }
  }
)

userSchema.virtual('expenses', {
  ref: 'ExpensesModel',
  localField: '_id',
  foreignField: 'user'
})

userSchema.virtual('revenues', {
  ref: 'RevenuesModel',
  localField: '_id',
  foreignField: 'user'
})

userSchema.set('toObject', { virtuals: true })
userSchema.set('toJson', { virtuals: true })

module.exports = mongoose.model('UserModel', userSchema)
