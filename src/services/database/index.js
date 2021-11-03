const mongoose = require('mongoose')
const Helpers = require('../../helpers')

const defaultConfig = {
  name: 'PFM_DB',
  url: '//localhost:27017'
}

const environment = process.env.NODE_ENV

const createDatabase = (config = {}) => {
  const name = config.name || defaultConfig.name
  const url = config.url || defaultConfig.url

  const start = async () => {
    await mongoose
      .connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
      })
      .then(() =>
        Helpers.triggerLoggerAndReturnResult(
          `> [DATABASE] the database ${name} starting on ${url} in ${environment} mode!`
        )
      )
      .catch(error =>
        Helpers.triggerLoggerAndReturnResult(
          `> [DATABASE] Failed error: ${error}!`,
          'error'
        )
      )
  }

  const stop = () => {
    return new Promise(resolve => {
      if (mongoose.connection.readyState === 1) {
        Helpers.triggerLoggerAndReturnResult(
          `> [DATABASE] Database ${name} on ${url} was stoped with success`
        )
        mongoose.connection.close(resolve)
      }
    })
  }

  return {
    start,
    stop
  }
}

module.exports = createDatabase
