const asyncHandler = require("express-async-handler")

const Goal = require('../model/goalModel')

// get goals
// get/api/goals
// access private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find()
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
    text: req.body.text
  })
  res.status(200).json(goal)
})

// update goals
// update/api/goals
// access private
const updateGoals = asyncHandler(async (req, res) => {
  res.status(200).json({message: `Update goals ${req.params.id}`})
})

// delete goals
// delete/api/goals
// access private
const deleteGoals = asyncHandler(async (req, res) => {
  res.status(200).json({message: `Delete goals ${req.params.id}`})
})

module.exports = {
  getGoals, setGoals, updateGoals, deleteGoals
}