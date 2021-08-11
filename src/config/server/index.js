const express = require('express')
const logger = require('../../utils/logger')
// const pinoHttp = require('pino-http')({ logger })
const bodyParser = require('body-parser')
const compress = require('compression')

const home = require('../../routes/home')
const user = require('../../routes/user')
const expenses = require('../../routes/expenses')

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
    // app.use(pinoHttp)
    app.use(bodyParser.json({ type: '*/json' }))
    app.use(endPointVersion, router)
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(compress())
  }

  const defineRoutes = () => {
    home.routes(router)
    user.routes(router)
    expenses.routes(router)
  }

  const test = () => {
    try {
      defineRoutes()
      defineConfig()
    } catch (error) {
      return error
    } finally {
      return app
    }
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
        return serverInstance.close(async () => {
          logger.info(
            `> [SERVER] Server running on ${port}, api version: ${version} endpoint version: ${endPointVersion} was stopped`
          )
          return resolve
        })
      }
      return resolve()
    })
  }

  return {
    test,
    start,
    stop
  }
}

module.exports = CreateServer
