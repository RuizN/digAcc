const mongoose = require('mongoose')

const {Schema} = mongoose

const paymentMethodModel = new Schema(
  {
    paymentMethodName: {type: String},
    type: {type: String},
  },
  
  {
    collection : 'incomes'
  }
)

module.exports = mongoose.model('income', incomeModel)