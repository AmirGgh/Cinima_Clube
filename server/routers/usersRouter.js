const express = require('express');
const usesrsBLL = require('../BLL/usersBLL');
const jwt = require('jsonwebtoken')
const router = express.Router();

// Entry Point 'http://localhost:8000/users'

// Get All users -> return only users that admin create
//--------------------------------------------------------------------------------
router.get('/', async (req, res) => {
  const PRIVATE_KEY = 'somekey'
  const token = req.headers['x-access-token']
  if (!token) return res.status(401).send({ auth: false, message: 'No Token Provided' })
  jwt.verify(token, PRIVATE_KEY, async (err, decoded) => {
    if (err) res.status(500).send({ auth: false, message: 'Failed To authenticate' })
    const users = await usesrsBLL.getAllUsers();
    res.status(200).send(users)
  })
});



// Get user By ID
router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  const user = await usesrsBLL.getUserById(id);
  res.json(user);
});

// Add a user
router.route('/').post(async (req, res) => {
  const obj = req.body;
  const result = await usesrsBLL.addUser(obj);
  // add to User.json & premissions 
  res.json(result);
});

// Update a user
router.route('/:id').put(async (req, res) => {
  const { id } = req.params;
  const obj = req.body;
  const result = await usesrsBLL.updateUser(id, obj);
  // update to User.json & premissions 
  res.json(result);
});

// Delete a user
router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;
  const result = await usesrsBLL.deleteUser(id);
  // delete at User.json & premissions 
  res.json(result);
});

module.exports = router;
