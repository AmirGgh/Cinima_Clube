const { User } = require('../models/allModels');
const { addPremissJson, deletePremissJson } = require('./premissionsJsonBLL');
const { addUserJson, deleteUserJson } = require('./userJsonBLL');
//add, update and delete will effect the files: premissionsData.json and users.json



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
  const mov = new User({ username: obj.username, password: obj.password });
  const user = await mov.save()
  const userJSON = { id: user.id, ...obj.user }
  const permJSON = { id: user.id, ...obj.permissions }
  addUserJson(userJSON)
  addPremissJson(permJSON)

  return 'Created!';
};

//first serves starting
const defineAdmin = () => {
  User.countDocuments({}, (err, count) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    // If user collection is empty(first run of the server), insert default admin user
    if (count === 0) {
      addUser({
        "username": "Admin",
        "password": "Ad1234",
        "user": { "FirstName": "Admin", "LastName": "a", "SessionTimeOut": 10000 },
        "permissions": { "userPremiss": ["CRUD Users", "View Subscriptions", "Create Subscriptions", "Delete Subscriptions", "View Movies", "Create Movies", "Delete Movies"] }
      })
      console.log("Default admin user created!");
    }
  });
}
// PUT - Update - 
const updateUser = async (id, obj) => {
  await User.findByIdAndUpdate(id, obj);
  return 'Updated!';
};

// DELETE - Delete
const deleteUser = async (id) => {
  await User.findByIdAndDelete(id);
  deletePremissJson(id)
  deleteUserJson(id)
  return 'Deleted!';
};

module.exports = {
  defineAdmin,
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
};
