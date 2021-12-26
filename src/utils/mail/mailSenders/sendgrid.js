// eslint-disable-next-line no-use-before-define
require('dotenv').config()
const sgMail = require('@sendgrid/mail')

const sendgrid = (() => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  const msg = {
    to: 'test@example.com', // Change to your recipient
    from: 'test@example.com', // Change to your verified sender
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>Email sent via sendGrid mailer</strong>'
  }

  const send = async () => {
    try {
      await sgMail.send(msg)
      return 'email sent'
    } catch (error) {
      console.error('error:', error)
    }
  }

  return {
    send
  }
})()

module.exports = sendgrid
