const mongoose = require('mongoose')
const Helpers = require('../../helpers')

const defaultConfig = {
  name: 'PFM_DB',
  url: '//localhost:27017',
  user: '',
  password: ''
}

const environment = process.env.NODE_ENV
let urlDB = ''

const createDatabase = (config = {}) => {
  const name = config.name || defaultConfig.name
  const url = config.url || defaultConfig.url
  const user = config.user || defaultConfig.user
  const password = config.password || defaultConfig.password

  const start = async () => {
    if(environment === 'development') {
      urlDB = `${url}/${name}`
    } else {
      urlDB = `mongodb+srv://${user}:${password}@dev.sbdid.mongodb.net/${name}?retryWrites=true&w=majority`
    }
    
    await mongoose
      .connect(urlDB, {
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
