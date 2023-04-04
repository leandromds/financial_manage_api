const UserController = require('./controllers');
const { auth } = require('../../utils/jwt');

const routes = (router) => {
  router.post('/register', UserController.register);
  router.get('/signin', UserController.signin);
  router.get('/forgot-password', UserController.forgotPassword);
  router.get('/reset-password/:userId/:token', UserController.resetPassword);
  router.get('/me', auth, UserController.me);
};

module.exports = { routes };
