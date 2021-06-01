//const jwt = require('jsonwebtoken')
//const bcrypt = require('bcrypt') 

const expensesController = (Expense) =>{

  const getExpenses = async (req , res) => {
    try {
      const {query} = req
      const response = await Expense.find(query)

      return res.json(response)
    } catch (error) {
      throw error
    }
  }

  const postExpenses = async (req , res) => {
    try {
      const {body} = req
      console.log('Body:',body)
      const expenseObject = {
        amount : body.amount,
        type : body.type,
        numberOfInstallments: body.numberOfInstallments,
        periodFirstInstallment: body.periodFirstInstallment,
        category: body.category,
        paymentMethod: body.paymentMethod,
        description: body.description,
       }

        const expense = new Expense(expenseObject)
        await expense.save()
        return res.status(201).json(expense)
      }
      catch (error) {
      throw error
    }
  }

   const getExpenseId = async (req , res) => {
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
  }

  const putExpenseId = async(req , res) => {
    try {
      const {params , body} = req
      const response = await Expense.updateOne({
        _id: params.expenseId
      }, {
        $set: {
              amount : body.amount,
              type : body.type,
              numberOfInstallments: body.numberOfInstallments,
              periodFirstInstallment: body.periodFirstInstallment,
              category: body.category,
              paymentMethod: body.paymentMethod,
              description: body.description,
        }
      })

      if(response.n==0){
        return res.status(404).json({message:'Cant update - this expense does not exist'}) 
      }

      return res.status(202).json(response)
    } catch (error) {
      throw error
    } 
  }

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
  }

 
   

  return { getExpenses, postExpenses, getExpenseId, putExpenseId, deleteExpenseId} //, getUserName}
}

module.exports = expensesController