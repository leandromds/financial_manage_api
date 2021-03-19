const logger = require('../utils/logger')

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
