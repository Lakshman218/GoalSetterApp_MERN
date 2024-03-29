const asyncHandler = require("express-async-handler")

const Goal = require('../model/goalModel')
const User = require('../model/userModel')

// get goals
// get/api/goals
// access private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id }) 
  res.status(200).json(goals)
})

// set goals
// set/api/goals
// access private
const setGoals = asyncHandler(async (req, res) => {
  if(!req.body.text) {
    res.status(400)
    throw new Error('please add a text field')
  }
  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id
  })
  res.status(200).json(goal)
})

// update goals
// update/api/goals
// access private
const updateGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id)
  if(!goal) {
    throw new Error('Goal not found')
  }

  const user = await User.findById(req.user.id)
  // check for user
  if(!user) {
    res.status(401)
    throw new Error('User not found')
  }
  // make sure the logged in user matches the goal user
  if(goal.user.tostring() !== user.id) {
    res.status(401)
    throw new Error('user not authorized')
  }

  const updateGoals = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  })
  res.status(200).json(updateGoals)
})

// delete goals
// delete/api/goals
// access private
const deleteGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id)

  if(!goal) {
    res.status(400)
    throw new Error('Goal not found')
  }
  const user = await User.findById(req.user.id)
  // check for user
  if(!user) {
    res.status(401)
    throw new Error('User not found')
  }
  // make sure the logged in user matches the goal user
  if(goal.user.tostring() !== user.id) {
    res.status(401)
    throw new Error('user not authorized')
  }
  await goal.remove()
  res.status(200).json({id: req.params.id}) 
})

module.exports = {
  getGoals, setGoals, updateGoals, deleteGoals
}