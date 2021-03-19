const pino = require('pino')({
  prettyPrint: {
    levelFirst: true,
    colorize: true
  }
})

module.exports = pino
