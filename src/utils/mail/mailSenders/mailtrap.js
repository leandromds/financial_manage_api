require('dotenv').config();
const nodemailer = require('nodemailer');
const path = require('path');
const hbs = require('nodemailer-express-handlebars');

const options = {
  viewEngine: {
    partialsDir: path.resolve('./src/resources/mail/partials'),
    layoutsDir: path.resolve('./src/resources/mail/'),
    defaultLayout: false,
  },
  viewPath: path.resolve('./src/resources/mail/'),
  extName: '.hbs',
};

const mailtrap = (() => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: '90a4bff0192438',
      pass: '32f8d2295ac011',
    },
  });

  transporter.use('compile', hbs(options));

  const send = async (config) => {
    const { link, name } = config;
    await transporter.sendMail({
      from: 'Financial Manager <contact@financialmanager.com>',
      to: ['leandro.mds.21@gmail.com'],
      subject: 'Assunto do email',
      template: 'auth/forgot_password',
      context: { link, name },
    });
  };

  return {
    send,
  };
})();

module.exports = mailtrap;
