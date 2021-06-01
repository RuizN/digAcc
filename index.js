const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Expense = require('./models/expenseModel.js')
const User = require('./models/userModel.js')
//const jwt = require('express-jwt')
const expensesRouter = require('./routers/expensesRouter.js')(Expense)
const userRouter = require('./routers/userRouter.js')(User)

const connectDB = async()=> {
  try{
    await mongoose.connect('mongodb://localhost/dAccAPI')
    console.log('SE CONECTO A LA DB')
  } catch (error){
    throw error
  }
}

connectDB()

const app = express()

app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())
//app.all("/api/*", jwt({secret: "714680tlf", algorithms: ["HS256"]}).unless({ path : ["/api/login"]}))
app.use('/api', expensesRouter)
app.use('/api', userRouter)

/* app.get('/',(req,res) => {
  res.send('Hello World')
}) */

const port = 3000

app.listen(port, () => {
  console.log(`started server on port: ${port}`)
})