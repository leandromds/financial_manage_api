require('dotenv').config()
const pkg = require('../../../package.json')
const createServer = require('../../../src/config/server')

const configServer = {
  port: process.env.SERVER_PORT || 3003,
  endPointVersion: process.env.ENDPOINT_VERSION || '/v1/',
  version: pkg.version || '0.0.1'
}

const httpServer = (() => {
  const server = createServer(configServer).test()
  return server
})()

module.exports = httpServer