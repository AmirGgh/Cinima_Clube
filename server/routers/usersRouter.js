const express = require('express');
const usesrsBLL = require('../BLL/usersBLL');
const jwt = require('jsonwebtoken')
const router = express.Router();

// Entry Point 'http://localhost:8000/users'

// const admin

//--------------------------------------------------------------------------------
// Get All users 
router.get('/', async (req, res) => {
  const PRIVATE_KEY = 'somekey';
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(401).send({ auth: false, message: 'No Token Provided' });
  }

  jwt.verify(token, PRIVATE_KEY, async (err, decoded) => {
    if (err) {
      return res.status(500).send({ auth: false, message: 'Failed To authenticate' });
    }

    // Check for 'CRUD Users' permission
    if (!decoded.permissions || !decoded.permissions.includes('CRUD Users')) {
      return res.status(403).send({ auth: false, message: 'Access Forbidden' });
    }

    // Only allow access if 'CRUD Users' permission is present
    const users = await usesrsBLL.getAllUsers();
    res.status(200).send(users);
  });
});
router.get('/allUsers', async (req, res) => {
  const PRIVATE_KEY = 'somekey';
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(401).send({ auth: false, message: 'No Token Provided' });
  }

  jwt.verify(token, PRIVATE_KEY, async (err, decoded) => {
    if (err) {
      return res.status(500).send({ auth: false, message: 'Failed To authenticate' });
    }

    // Check for 'CRUD Users' permission
    if (!decoded.permissions || !decoded.permissions.includes('CRUD Users')) {
      return res.status(403).send({ auth: false, message: 'Access Forbidden' });
    }

    // Only allow access if 'CRUD Users' permission is present
    const users = await usesrsBLL.allUsers();
    res.status(200).send(users);
  });
});


// Get user By ID -?
router.route('/:id').get(async (req, res) => {

  const PRIVATE_KEY = 'somekey';
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(401).send({ auth: false, message: 'No Token Provided' });
  }

  jwt.verify(token, PRIVATE_KEY, async (err, decoded) => {
    if (err) {
      return res.status(500).send({ auth: false, message: 'Failed To authenticate' });
    }

    // Check for 'CRUD Users' permission
    if (!decoded.permissions || !decoded.permissions.includes('CRUD Users')) {
      return res.status(403).send({ auth: false, message: 'Access Forbidden' });
    }

    // Only allow access if 'CRUD Users' permission is present
    const { id } = req.params;
    const user = await usesrsBLL.getUserById(id);
    res.status(200).send(user);
  });
});

// Add a user
router.route('/').post(async (req, res) => {

  const PRIVATE_KEY = 'somekey';
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(401).send({ auth: false, message: 'No Token Provided' });
  }

  jwt.verify(token, PRIVATE_KEY, async (err, decoded) => {
    if (err) {
      return res.status(500).send({ auth: false, message: 'Failed To authenticate' });
    }

    // Check for 'CRUD Users' permission
    if (!decoded.permissions || !decoded.permissions.includes('CRUD Users')) {
      return res.status(403).send({ auth: false, message: 'Access Forbidden' });
    }

    // Only allow access if 'CRUD Users' permission is present
    const obj = req.body;
    const result = await usesrsBLL.addUser(obj);

    res.status(200).send(result);
  });

});

// Update a user -admin can update everything user can update his (username,password)-mongoDB,(Fname,Lname)-users.JSON
router.route('/:id').put(async (req, res) => {
  const { id } = req.params;
  const obj = req.body;
  const result = await usesrsBLL.updateUser(id, obj);
  // update to User.json & premissions 
  res.json(result);
});

router.route('/username/:username').post(async (req, res) => {
  const result = await usesrsBLL.createAccuont(req.body);
  res.json(result);
});

// Delete a user
router.route('/:id').delete(async (req, res) => {

  const PRIVATE_KEY = 'somekey';
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(401).send({ auth: false, message: 'No Token Provided' });
  }

  jwt.verify(token, PRIVATE_KEY, async (err, decoded) => {
    if (err) {
      return res.status(500).send({ auth: false, message: 'Failed To authenticate' });
    }

    // Check for 'CRUD Users' permission
    if (!decoded.permissions || !decoded.permissions.includes('CRUD Users')) {
      return res.status(403).send({ auth: false, message: 'Access Forbidden' });
    }

    // Only allow access if 'CRUD Users' permission is present
    const { id } = req.params;
    const result = await usesrsBLL.deleteUser(id);

    res.status(200).send(result);
  });
});

module.exports = router;
