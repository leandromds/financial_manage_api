const mongoose = require('mongoose')
const Helpers = require('../../helpers')

const defaultConfig = {
  name: 'appDB',
  url: '//localhost:27017',
  user: 'leandromds',
  password: 'hyl2Q4kBFE9uldAS'
}

const environment = process.env.ENV

const createDatabase = (config = {}) => {
  const name = config.name || defaultConfig.name
  const url = config.url || defaultConfig.url
  const user = config.user || defaultConfig.user
  const password = config.password || defaultConfig.password

  const start = async (server) => {
    if(environment === 'production' ||environment === 'homologation' ) {
      await mongoose
      .connect(`mongodb+srv://${user}:${password}@dev.sbdid.mongodb.net/${name}?retryWrites=true&w=majority`, {
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
      return
    }

    await mongoose
      .connect(`mongodb:${url}/${name}`, {
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
