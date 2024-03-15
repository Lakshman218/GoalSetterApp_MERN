const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')

// register new user
// post /api/users
// access public
const registerUser = asyncHandler(async(req, res) => {
  const {name, email, password} = req.body
  if(!name || !email || !password) {
    res.status(400)
    throw new Error('please add all fields')
  }

  const userExist = await User.findOne({email})
  
  if(userExist) {
    res.status(400)
    throw new Error('user already exists')
  }

  // hash password
  const salt = await bcrypt.genSalt(10)
  const hashedpassword = await bcrypt.hash(password, salt)

  // create user
  const user = await User.create({ 
    name,
    email,
    password: hashedpassword
  })

  if(user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  } 
})

// auth new user
// post /api/users/login
// access public
const loginUser = asyncHandler(async(req, res) => {
  const {email, password} = req.body
  const user = await User.findOne({email})
  
  if(user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
 
  res.json({ message: 'Login User'})
})
// register get user data
// post /api/users/me
// access public
const getMe = asyncHandler(async(req, res) => {
  res.json({ message: 'Display user data'})
})

module.exports = {
  registerUser,loginUser,getMe
}
 