const pino = require('pino')();

const Helpers = (() => {
  const triggerLoggerAndReturnResult = (data, typeOfLog = 'info') => {
    if (typeOfLog === 'info') pino.info(data);
    if (typeOfLog === 'error') pino.error(data);
    return data;
  };

  return {
    triggerLoggerAndReturnResult,
  };
})();

module.exports = Helpers;
