const sendgrid = require('./mailSenders/sendgrid');
const mailtrap = require('./mailSenders/mailtrap');

const mailer = (() => {
  const sendMail = async (config) => {
    if (!config.test) {
      await sendgrid.send();
      return;
    }
    await mailtrap.send(config);
  };

  return {
    sendMail,
  };
})();

module.exports = mailer;
