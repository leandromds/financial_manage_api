const pino = require('pino')
const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true
    }
  }
})

const Helpers = (() => {
  const triggerLoggerAndReturnResult = (data, typeOfLog = 'info') => {
    if (typeOfLog === 'info') logger.info(data)
    if (typeOfLog === 'error') logger.error(data)
    return data
  }

  return {
    triggerLoggerAndReturnResult
  }
})()

module.exports = Helpers
