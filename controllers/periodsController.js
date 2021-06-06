//const jwt = require('jsonwebtoken')
//const bcrypt = require('bcrypt') 

const periodsController = (Period) =>{

  const getPeriods = async (req , res) => {
    try {
      const {query} = req
      const response = await Period.find(query)

      return res.json(response)
    } catch (error) {
      throw error
    }
  }

  const postPeriod = async (req , res) => {
    try {
      const {body} = req
      //console.log('Body:',body)
      const periodObject = {
        periodName : body.periodName,
        periodExpenses : body.periodExpenses,
        periodIncomes: body.periodIncomes,
       }

        const period = new Period(periodObject)
        await period.save()
        return res.status(201).json(period)
      }
      catch (error) {
      throw error
    }
  }

   /* const getExpenseId = async (req , res) => {
    try {
      const {params} = req
      const response = await Expense.findById(params.expenseId)

      if (!response){
        return res.status(404).json({message:'This expense does not exist'})
      }

      return res.json(response)
     
    } catch (error) {
      throw error
    }
  }*/

  const putPeriodId = async(expenseData) => {
    try {
      //const {params , body} = req
      //console.log('req', req)
      const response = await Period.updateOne({
        periodName: expenseData.periodFirstInstallment
      }, {
        $push: {
         // periodName : body.periodName,
          periodExpenses : expenseData._id
         // periodIncomes: body.periodIncomes,
        }
      })

      if(response.n==0){
        return res.status(404).json({message:'Cant update - this period does not exist'}) 
      }

      return res.status(202).json(response)
    } catch (error) {
      throw error
    } 
  }
/*
  const deleteExpenseId = async (req , res) => {
    try {
      const {params} = req
      const response = await Expense.findByIdAndDelete(params.expenseId)

      if (!response){
        return res.status(404).json({message:'This expense does not exist'})
      }
      
      return res.status(202).json({message:'The user has been delete successfully'})
      
    } catch (error) {
      throw error
    }
  } */

 
   

  return { getPeriods, postPeriod, putPeriodId/* , getExpenseId, putExpenseId, deleteExpenseId */} 
}

module.exports = periodsController