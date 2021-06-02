const mongoose = require('mongoose')

const {Schema} = mongoose

const periodModel = new Schema(
  {
    periodName: {type: String},       //Year and Month we are watching "AAAA-MM"
    periodExpenses: [{ type: String /* Schema.Types.ObjectId, ref:'Expense' */}],   //We have to put here de refs of each expense for this corresponding period
    periodIncomes: [Schema.Types.ObjectId],    //We have to put here de refs of each income for this corresponding period

  },
  
  {
    collection : 'periods'
  }
)

module.exports = mongoose.model('Periods', periodModel)