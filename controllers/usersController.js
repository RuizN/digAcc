//const jwt = require('jsonwebtoken')
//const bcrypt = require('bcrypt') 

const usersController = (User) =>{

  const getUsers = async (req , res) => {
    try {
      const {query} = req
      const response = await User.find(query)

      return res.json(response)
    } catch (error) {
      throw error
    }
  }

  const postUser = async (req , res) => {
    try {
      const {body} = req
      //console.log('Body:',body)
     // const saltRound = 10
    // const encryptedPassword = await bcrypt.hash(body.password, saltRound)

      const newUserName = () =>{
        const firstName = body.firstName
        const lastName = body.lastName
        const newUserName = firstName + "." + lastName

        return newUserName.toLowerCase()
      }

      const userObject = {
        firstName : body.firstName,
        lastName : body.lastName,
        userName: newUserName(),
        password: body.password, //encryptedPassword, 
        email: body.email,
       }

      //const foundUser = await User.findOne({userName : userObject.userName})

      //if (!foundUser){
        const user = new User(userObject)
        await user.save()
        return res.status(201).json(user)
      }//else{
        //return res.status(202)
          //.json({message: 'The existing userName'})
      //}} 
      catch (error) {
      throw error
    }
  }

  const getUserId = async (req , res) => {
    try {
      const {params} = req
      const response = await User.findById(params.userId)

      if (!response){
        return res.status(404).json({message:'The User does not exist'})
      }

      return res.json(response)
     
    } catch (error) {
      throw error
    }
  }

  const getUserName = async (req , res) => {
    try {
      const {params} = req
      const response = await User.find({userName : params.userName})

      if (!response){
        return res.status(202).json({message:'The User does not exist'})
      }

      return res.json(response)
     
    } catch (error) {
      throw error
    }
  }

  const putUserId = async(req , res) => {
    try {
      const {params , body} = req

      const saltRound = 10
      const encryptedPassword = await bcrypt.hash(body.password, saltRound)

      const newUserName = () =>{
        const firstName = body.firstName
        const lastName = body.lastName
        const newUserName = firstName + "." + lastName

        return newUserName.toLowerCase()
      
      }
  
      const response = await User.updateOne({
        _id: params.userId
      }, {
        $set: {
          firstName: body.firstName,
          lastName: body.lastName,
          userName: newUserName(),
          password: encryptedPassword,
          email: body.email,
             }
      })

      if(response.n==0){
        return res.status(404).json({message:'Cant update - the User does not exist'}) 
      }

      return res.status(202).json(response)
    } catch (error) {
      throw error
    } 
  }

  const deleteUserId = async (req , res) => {
    try {
      const {params} = req
      const response = await User.findByIdAndDelete(params.userId)

      if (!response){
        return res.status(404).json({message:'The User does not exist'})
      }
      
      return res.status(202).json({message:'The user has been delete successfully'})
      
    } catch (error) {
      throw error
    }
  }

  const userLogin = async (req , res) => {
    try {
      const {body} = req 
      const foundUser = await User.findOne({userName : body.userName})
      
      if (foundUser != null){
        const isPasswordCorrect = await bcrypt.compare(body.password, foundUser.password)
        
        if (isPasswordCorrect){
            //gereno token
            const tokenUser = {
              firstName : foundUser.firstName,
              lastName : foundUser.lastName,
              userName : foundUser.userName
            }
            const token = jwt.sign(tokenUser, '714680tlf', {expiresIn: '1h'})
            return res.status(202)
              .json({message: 'OK', token: token}) 
            
        }else {
          return res.status(404)
            .json({message: 'Invalid Credential'})
        }

      }else {
        return res.status(404)
          .json({message: 'Invalid Credential'})
      }
      
    } catch (error) {
      throw error
    }
  }

  return {getUsers, postUser, getUserId, getUserName, putUserId, deleteUserId, userLogin}
}

module.exports = usersController