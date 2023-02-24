const { getAllUsersFirstTime } = require('../DALS/movieUserDAL');
const { Member } = require('../models/allModels');

// GET - Get All - Read
const getAllMembers = async () => {
    const count = await Member.countDocuments({});
    if (count === 0) {
        const { data } = await getAllUsersFirstTime()
        for (let mem of data) {
            mem = { ...mem, city: mem.address.city }
            const memberModel = new Member(mem);
            await memberModel.save();
        }
    }
    let members = await Member.find({})
    return members
};

// GET - Get By Id - read
const getMemberById = (id) => {
    return Member.findById({ _id: id });
};

// POST - Create
const addMember = async (obj) => {
    const mem = new Member(obj);
    await mem.save();
    return 'Created!';
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
};
