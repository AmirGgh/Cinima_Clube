
const { getAllUsersFirstTime } = require('../DALS/movieUserDAL');
const { Member } = require('../models/allModels');
const { getAllUsersJson } = require('./userJsonBLL');

// GET - Get All - Read
const getAllMembers = async () => {
    return await Member.find({})
};
const menageMembers = async () => {
    const members = await Member.find({})
    const usersPremiss = await getAllPremissJson().permissions
    const allUsers = await getAllUsersJson().users
    return { members: members, usersPremiss: usersPremiss, allUsers: allUsers }
};
// GET - Get By Id - read
const getMemberById = (id) => {
    return Member.findById({ _id: id });
};

// POST - Create
const addMember = async (obj) => {
    const mem = new Member(obj);
    await mem.save();
    return mem.id;
};

// PUT - Update
const updateMember = async (id, obj) => {
    await Member.findByIdAndUpdate(id, obj);
    return 'Updated!';
};

// DELETE - Delete
const deleteMember = async (id) => {
    await Member.findByIdAndDelete(id);
    return 'Deleted!';
};

module.exports = {
    getAllMembers,
    getMemberById,
    addMember,
    updateMember,
    deleteMember,
    menageMembers
};
