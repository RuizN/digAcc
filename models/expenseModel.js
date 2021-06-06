const mongoose = require('mongoose')

const {Schema} = mongoose

const expenseModel = new Schema(
  {
    amount: {type: Number},                   //Amount ok $$ being expended
    type: {type: String},                     //is it Fixed or is it Variable. Fixed expense are going to be considered for future periods (amount could be variable althoug?) 
    numberOfInstallments: {type: Number},     //Numero de cuotas
    periodFirstInstallment: {type: String},   //In which period am i supposed to be paying the first of all Installments/Cuotas?
    category: {type: String},                 // Categories the Admin may create. Type should be an array here!!
    paymentMethod: {type: String},            //Payment method added by Admin
    description: {type: String},              //Description of the expense: "Dinner we have at La Posada"
  },
  
  {
    collection : 'expenses'
  }
)

module.exports = mongoose.model('Expense', expenseModel)