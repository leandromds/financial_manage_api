const mongoose = require('mongoose')
const crypto = require('crypto')

const UserSchema = new mongoose.Schema(
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

module.exports = mongoose.model('UserModel', UserSchema)
