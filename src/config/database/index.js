const mongoose = require('mongoose')
const logger = require('../../utils/logger')

const defaultConfig = {
  name: 'appDB',
  url: '//localhost:27017',
  user: 'root',
  password: '12345'
}

const createDatabase = (config = {}) => {
  const name = config.name || defaultConfig.name
  const url = config.url || defaultConfig.url
  // const user = config.user || defaultConfig.user
  // const password = config.user || defaultConfig.user

  const start = async () => {
    await mongoose
      .connect(`mongodb:${url}/${name}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
      })
      .then(() =>
        logger.info(`> [DATABASE] the database ${name} starting on ${url}!`)
      )
      .catch(error => logger.info(`> [DATABASE] Failed error: ${error}!`))
  }

  const stop = () => {
    return new Promise(resolve => {
      if (mongoose.connection.readyState === 1) {
        logger.info(`> [DATABASE] Database ${name} on ${url} was stoped with success`)
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
