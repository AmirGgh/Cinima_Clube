const { User } = require('../models/allModels');
const { Member } = require('../models/allModels');

const { addPremissJson, deletePremissJson, getAllPremissJson } = require('./premissionsJsonBLL');
const { addUserJson, deleteUserJson, getAllUsersJson } = require('./userJsonBLL');
const membersBLL = require('../BLL/membersBLL');
const { getAllUsersFirstTime } = require('../DALS/movieUserDAL');

//add, update and delete will effect the files: premissionsData.json and users.json



//  Get All - Read - users+jsons
// first start : username=first name, password=last name, sets member values normally, basic premissions and sessions
const getAllUsers = async () => {
  return await User.find({})
};
const allUsers = async () => {
  const premissions = await getAllPremissJson()
  const usersData = await getAllUsersJson()
  const members = await Member.find({})
  const username = await User.find({})
  const data = username.map((u) => { return { "id": u.id, "username": u.username, "member": members.find((m) => m.idUser === u.id), "premissions": premissions.find((p) => p.id === u.id).userPremiss, "usersData": usersData.find((d) => d.id === u.id) } })
  return { data }
};


//  Get By Id - read + premissions??????
const getUserById = (id) => {
  return User.findById({ _id: id });
};

//  Create
// {usernam:'',password:'', permissions:[], user:{},member:{}}
const addUser = async (obj) => {
  const u = new User({ username: obj.username, password: obj.password });
  const user = await u.save()
  await user.save()
  const userJSON = { id: user.id, ...obj.user }
  const permJSON = { id: user.id, ...obj.permissions }
  const member = { idUser: user.id, ...obj.member }
  await addUserJson(userJSON)
  await addPremissJson(permJSON)
  await membersBLL.addMember(member)
};

//first serves starting
const defineAdmin = async () => {
  const countMember = await Member.countDocuments({})
  // If user collection is empty(first run of the server), insert default admin user and other default users
  let numUsers = 11
  if (countMember < numUsers) {
    const { data } = await getAllUsersFirstTime()
    await addUser({
      "username": "admin",
      "password": "ad1234",
      "user": { "FirstName": "Admin", "LastName": "a", "SessionTimeOut": 10000 },
      "permissions": { "userPremiss": ["CRUD Users", "View Subscriptions", "Create Subscriptions", "Update Subscriptions", "Delete Subscriptions", "View Movies", "Create Movies", "Update Movies", "Delete Movies"] }
    })
    for (let user of data) {
      let [username, password] = user.name.split(" ");
      let newUser = { "username": username, "password": password, "permissions": { "userPremiss": ["View Subscriptions", "Create Subscriptions"] }, "user": { "firstName": username, "lastName": password, "SessionTimeOut": 200 }, member: { ...user, "city": user.address.city, "firstName": username, "lastName": password } }
      await addUser(newUser)
    }

  } else { console.log("All default users created!"); return; }
}
//  Update - username, first + last name, premissions, sessions 
const updateUser = async (id, obj) => {
  await User.findByIdAndUpdate(id, obj);
};

// DELETE - Delete db -> user + subscripions,  jsons
const deleteUser = async (id) => {
  await User.findByIdAndDelete(id);
  deletePremissJson(id)
  deleteUserJson(id)
};

module.exports = {
  defineAdmin,
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
  allUsers
};

