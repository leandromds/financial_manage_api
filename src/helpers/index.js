const pino = require('pino')()
const chalk = require('chalk')
const { pid } = require('process')
const os = require('os')
const hostname = os.hostname()

const Helpers = (() => {
  const triggerLoggerAndReturnResult = (data, typeOfLog = 'info') => {
    if (typeOfLog === 'info') pino.info(data)
    if (typeOfLog === 'error') pino.error(data)
    return data
  }

  const newLogger = (data, typeOfLog = 'info') => {
    if (typeOfLog === 'info') console.log(
      `${chalk.greenBright('INFO')} (${pid} on ${hostname}) ${chalk.cyan(data)}`)
    if (typeOfLog === 'error') console.error(`${chalk.redBright('INFO')} ${new Error(data)}`)
    return data
  }

  return {
    triggerLoggerAndReturnResult,
    newLogger
  }
})()

module.exports = Helpers
