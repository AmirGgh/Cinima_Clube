const express = require('express');
const membersBLL = require('../BLL/membersBLL');
const jwt = require('jsonwebtoken')


const router = express.Router();

// Entry Point 'http://localhost:8000/members'
const PRIVATE_KEY = 'somekey';

// Middleware for authenticating the token and checking for 'CRUD Users' permission
const authenticate = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(401).json({ auth: false, message: 'No Token Provided' });
  }

  jwt.verify(token, PRIVATE_KEY, (err, decoded) => {
    if (err) {
      return res.status(500).json({ auth: false, message: 'Failed To authenticate' });
    }

    if (!decoded.permissions || !decoded.permissions.includes('CRUD Users')) {
      return res.status(403).json({ auth: false, message: 'Access Forbidden' });
    }

    next();
  });
};


// Get All members
router.route('/').get(async (req, res) => {

  const members = await membersBLL.getAllMembers();
  res.json(members);
});

// Add a member
router.post('/', authenticate, async (req, res) => {
  const result = await membersBLL.addMember(req.body);
  res.json(result);
});

// Update a member
router.put('/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const obj = req.body;
  const result = await membersBLL.updateMember(id, obj);
  res.json(result);
});

// Delete a member
router.delete('/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const result = await membersBLL.deleteMember(id);
  res.json(result);
});

module.exports = router;
