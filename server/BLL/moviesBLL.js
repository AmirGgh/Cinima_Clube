const Person = require('../models/personModel');

// GET - Get All - Read
const getAllPersons = () => {
    return Person.find({});
};

// // GET - Get By Id - read
// const getPersonById = (id) => {
//     return Person.findById({ _id: id });
// };

// // POST - Create
// const addPerson = async (obj) => {
//     const per = new Person(obj);
//     await per.save();
//     return 'Created!';
// };

// // PUT - Update
// const updatePerson = async (id, obj) => {
//     await Person.findByIdAndUpdate(id, obj);
//     return 'Updated!';
// };

// // DELETE - Delete
// const deletePerson = async (id) => {
//     await Person.findByIdAndDelete(id);
//     return 'Deleted!';
// };

module.exports = {
    getAllPersons
};
// getPersonById,
// addPerson,
// updatePerson,
// deletePerson,