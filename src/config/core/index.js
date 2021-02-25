const pkg = require('../../../package.json')
const logger = require('../logger')
const createServer = require('../server')
const createDatabase = require('../database')

const configDefault = {
  server: {
    port: process.env.SERVER_PORT,
    endPointVersion: '/v1/',
    version: pkg.version
  },
  database: {
    name: 'appDB',
    url: '//localhost:27017',
    user: 'root',
    password: '12345'
  }
}

const createCore = () => {
  const server = createServer(configDefault.server)
  const database = createDatabase(configDefault.database)

  const start = async () => {
    try {
      logger.info('> [CORE] Starting...')
      await server.start()
      await database.start()
      logger.info('> [CORE] Starting done! System running!')
    } catch (error) {
      logger.error('> [CORE] An error occurred during system initialization')
      logger.error(error)
    }
  }

  const stop = async () => {
    try {
      logger.info('> [CORE] Stopping...')
      await server.stop()
      logger.info('> [CORE] Stopping done! system off')
    } catch (error) {
      logger.error('> [CORE] An error occurred during system initialization')
      logger.error(error)
    }
  }

  return {
    start,
    stop
  }
}

module.exports = createCore
