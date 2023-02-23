const express = require('express');
const personsBLL = require('../BLL/personsBLL');

const router = express.Router();

// Entry Point 'http://localhost:8000/persons'

// Get All Persons
router.route('/').get(async (req, res) => {
    const persons = await personsBLL.getAllPersons();
    res.json(persons);
});

// // Get Person By ID
// router.route('/:id').get(async (req, res) => {
//     const { id } = req.params;
//     const person = await personsBLL.getPersonById(id);
//     res.json(person);
// });

// // Add a Person
// router.route('/').post(async (req, res) => {
//     const obj = req.body;
//     const result = await personsBLL.addPerson(obj);
//     res.json(result);
// });

// // Update a Person
// router.route('/:id').put(async (req, res) => {
//     const { id } = req.params;
//     const obj = req.body;
//     const result = await personsBLL.updatePerson(id, obj);
//     res.json(result);
// });

// // Delete a Person
// router.route('/:id').delete(async (req, res) => {
//     const { id } = req.params;
//     const result = await personsBLL.deletePerson(id);
//     res.json(result);
// });

module.exports = router;