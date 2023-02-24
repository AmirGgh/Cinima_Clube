const { User } = require('../models/allModels');

// GET - Get All - Read
const getAllUsers = async () => {
  let users = await User.find({})
  return users
};

// GET - Get By Id - read
const getUserById = (id) => {
  return User.findById({ _id: id });
};

// POST - Create
const addUser = async (obj) => {
  const mov = new User(obj);
  await mov.save();
  return 'Created!';
};

// PUT - Update
const updateUser = async (id, obj) => {
  await User.findByIdAndUpdate(id, obj);
  return 'Updated!';
};

// DELETE - Delete
const deleteUser = async (id) => {
  await User.findByIdAndDelete(id);
  return 'Deleted!';
};

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
};
