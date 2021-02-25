const express = require('express')
const logger = require('../logger')
const home = require('../../routes/home')

const defaultConfig = {
  port: 3003,
  endPointVersion: '/v1/',
  version: '0.0.1'
}

const CreateServer = (config = {}) => {
  const app = express()
  const router = express.Router()
  const port = config.port || defaultConfig.port
  const endPointVersion =
    config.endPointVersion || defaultConfig.endPointVersion
  const version = config.version || defaultConfig.version

  let serverInstance

  const defineConfig = () => {
    app.use(endPointVersion, router)
  }

  const defineRoutes = () => {
    home.routes(router)
  }

  const start = () => {
    return new Promise((resolve, reject) => {
      try {
        defineRoutes()
        defineConfig()

        serverInstance = app.listen(port, () => {
          logger.info(
            `> [SERVER] Server started on ${port}, api version: ${version} endpoint version: ${endPointVersion}`
          )
          return resolve(app)
        })
      } catch (error) {
        reject(error)
      }
    })
  }

  const stop = () => {
    return new Promise(resolve => {
      if (serverInstance) {
        logger.info(
          `> [SERVER] Server running on ${port}, api version: ${version} endpoint version: ${endPointVersion} was stopped`
        )
        return serverInstance.close(resolve)
      }
      return resolve()
    })
  }

  return {
    start,
    stop
  }
}

module.exports = CreateServer
