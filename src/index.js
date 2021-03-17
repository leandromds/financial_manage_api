require('dotenv').config()
const logger = require('./config/logger')
const createCore = require('./config/core')

const core = createCore()

const shutdown = async () => {
  logger.info('Gracefully shutdown in progress')
  await core.stop()
  process.exit(0)
}

const iniApp = async () => {
  try {
    await core.start()
  } catch (error) {
    logger.error(error)
  }
}

iniApp()

process
  .on('SIGTERM', shutdown)
  .on('SIGINT', shutdown)
  .on('SIGHUP', shutdown)
  .on('uncaughtException', err => {
    logger.error('uncaughtException caught the error: ', err)
    throw err
  })
  .on('unhandledRejection', (err, promise) => {
    logger.error(`Unhandled Rejection at: Promise ${promise} reason: ${err}`)
    throw err
  })
  .on('exit', code => {
    logger.info(`Node process exit with code: ${code}`)
  })
