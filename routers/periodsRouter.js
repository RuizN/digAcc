const express = require('express')
//const Joi = require('joi')
//const validator = require('express-joi-validation').createValidator()
//const usersValidator = require('../validators/usersValidator.js')
const periodsController = require('../controllers/periodsController.js')

const routes = (Period) =>{
  const periodRouter = express.Router()
  const controller = periodsController(Period)
  //const validation = usersValidator()

  periodRouter.route('/periods')
  .get(/* validator.query(validation.querySchema), */ controller.getPeriods)
  .post(/* validator.body(validation.userSchema), */ controller.postPeriod)

      periodRouter.route('/periods/:periodId') 
 //     .get(/* validator.params(validation.userByIdSchema), */ controller.getPeriodId)
      .put(/* validator.params(validation.userByIdSchema), validator.body(validation.querySchema), */ controller.putPeriodId) 
 //     .delete(/* validator.params(validation.userByIdSchema), */ controller.deletePeriodId)

 /*  userRouter.route('/users/userName/:userName') 
  .get(validator.params( validation.querySchema), controller.getUserName)

  userRouter.route('/login')
  .post( validator.body(validation.userLogin),  controller.userLogin)
 */
  return periodRouter
}

module.exports = routes