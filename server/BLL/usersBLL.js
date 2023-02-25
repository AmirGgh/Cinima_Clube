const { User } = require('../models/allModels');

//first serves starting
const defineAdmin = () => {
  User.countDocuments({}, (err, count) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    // If user collection is empty(first run of the server), insert default admin user
    if (count === 0) {
      const adminUser = {
        username: "Admin",
        password: "Ad1234",
      };

      User.create(adminUser, (err, user) => {
        if (err) {
          console.error(err);
          process.exit(1);
        }
        console.log("Default admin user created:", user);
      });
    }
  });
}


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
  defineAdmin,
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
};
