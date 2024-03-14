// get goals
// get/api/goals
// access private
const getGoals = (req, res) => {
  res.status(200).json({message: 'Get goals'})
}

// set goals
// set/api/goals
// access private
const setGoals = (req, res) => {
  if(!req.body.text) {
    res.status(400)
    throw new Error('please add a text field')
  }
  res.status(200).json({message: 'Set goals'})
}

// update goals
// update/api/goals
// access private
const updateGoals = (req, res) => {
  res.status(200).json({message: `Update goals ${req.params.id}`})
}

// delete goals
// delete/api/goals
// access private
const deleteGoals = (req, res) => {
  res.status(200).json({message: `Delete goals ${req.params.id}`})
}

module.exports = {
  getGoals, setGoals, updateGoals, deleteGoals
}