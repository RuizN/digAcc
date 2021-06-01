const express = require('express')
//const Joi = require('joi')
//const validator = require('express-joi-validation').createValidator()
//const usersValidator = require('../validators/usersValidator.js')
const expensesController = require('../controllers/expensesController.js')

const routes = (Expense) =>{
  const expenseRouter = express.Router()
  const controller = expensesController(Expense)
  //const validation = usersValidator()

  expenseRouter.route('/expenses')
  .get(/* validator.query(validation.querySchema), */ controller.getExpenses)
  .post(/* validator.body(validation.userSchema), */ controller.postExpenses)

  expenseRouter.route('/expenses/:expenseId') 
  .get(/* validator.params(validation.userByIdSchema), */ controller.getExpenseId)
  .put(/* validator.params(validation.userByIdSchema), validator.body(validation.querySchema), */ controller.putExpenseId) 
  .delete(/* validator.params(validation.userByIdSchema), */ controller.deleteExpenseId)

 /*  userRouter.route('/users/userName/:userName') 
  .get(validator.params( validation.querySchema), controller.getUserName)

  userRouter.route('/login')
  .post( validator.body(validation.userLogin),  controller.userLogin)
 */
  return expenseRouter
}

module.exports = routes