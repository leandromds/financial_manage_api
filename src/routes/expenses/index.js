const controller = require('./controllers');
const { auth } = require('../../utils/jwt');

const routes = (router) => {
  router.get('/expenses', auth, controller.getAllExpenses);
  router.post('/expenses', auth, controller.addNewExpense);
  router.put('/expenses', auth, controller.updateExpense);
  router.delete('/expenses', auth, controller.deleteExpense);
};

module.exports = { routes };
