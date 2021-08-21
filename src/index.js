require('dotenv').config()
const Helpers = require('./helpers')
const createCore = require('./services/core')

const core = createCore()

const shutdown = async () => {
  Helpers.triggerLoggerAndReturnResult('Gracefully shutdown in progress')
  await core.stop()
  process.exit(0)
}

const iniApp = async () => {
  try {
    await core.start()
  } catch (error) {
    Helpers.triggerLoggerAndReturnResult(
      error,
      'error'
    )
  }
}

iniApp()

process
  .on('SIGTERM', shutdown)
  .on('SIGINT', shutdown)
  .on('SIGHUP', shutdown)
  .on('uncaughtException', error => {
    Helpers.triggerLoggerAndReturnResult(
      `uncaughtException caught the error: ${error}`,
      'error'
    )
    throw error
  })
  .on('unhandledRejection', (error, promise) => {
    Helpers.triggerLoggerAndReturnResult(
      `Unhandled Rejection at: Promise ${promise} reason: ${error}`,
      'error'
    )
    throw error
  })
  .on('exit', code => {
    Helpers.triggerLoggerAndReturnResult(`Node process exit with code: ${code}`)
  })
