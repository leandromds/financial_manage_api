// eslint-disable-next-line no-unused-expressions
require('dotenv').config;
const pkg = require('../../../package.json');
const Helpers = require('../../helpers');
const createServer = require('../server');
const createDatabase = require('../database');

const environment = process.env.NODE_ENV;

const configDefault = {
  server: {
    port: process.env.PORT,
    endPointVersion: process.env.ENDPOINT_VERSION,
    version: pkg.version,
  },
  database: {},
};

if (environment === 'development') {
  configDefault.database = {
    name: process.env.DB_NAME,
    url: process.env.DB_URL,
  };
} else {
  configDefault.database = {
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  };
}

const createCore = () => {
  const server = createServer(configDefault.server);
  const database = createDatabase(configDefault.database);

  const start = async () => {
    try {
      Helpers.triggerLoggerAndReturnResult('> [CORE] Starting all services');
      await server.start();
      await database.start();
      Helpers.triggerLoggerAndReturnResult(
        '> [CORE] Starting done! System running!'
      );
    } catch (error) {
      Helpers.triggerLoggerAndReturnResult(
        `> [CORE] An error occurred during system initialization\n reason: ${error}`,
        'error'
      );
    }
  };

  const stop = async () => {
    try {
      Helpers.triggerLoggerAndReturnResult('> [CORE] Stopping all services');
      await database.stop();
      await server.stop();
      Helpers.triggerLoggerAndReturnResult(
        '> [CORE] Stopping done! system off'
      );
    } catch (error) {
      Helpers.triggerLoggerAndReturnResult(
        `> [CORE] An error occurred during system initialization\n reason: ${error}`,
        'error'
      );
    }
  };

  return {
    start,
    stop,
  };
};

module.exports = createCore;
