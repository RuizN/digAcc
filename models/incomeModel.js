const mongoose = require('mongoose')

const {Schema} = mongoose

const incomeModel = new Schema(
  {
    amount: {type: String},
    type: {type: String},           //is it Fixed or is it Variable. Fixed expense are going to be considered for future periods (amount could be variable althoug?) 
    periodIncome: {type: String}, 
    description: {type: String}, 
  },
  
  {
    collection : 'incomes'
  }
)

module.exports = mongoose.model('income', incomeModel)