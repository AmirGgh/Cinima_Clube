const express = require('express');
const subscriptionsBLL = require('../BLL/subscriptionsBLL');
const jwt = require('jsonwebtoken')
const router = express.Router();

// Entry Point 'http://localhost:8000/subscriptions'

// Get All subscriptions
router.route('/').get(async (req, res) => {

  const PRIVATE_KEY = 'somekey';
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(401).send({ auth: false, message: 'No Token Provided' });
  }

  jwt.verify(token, PRIVATE_KEY, async (err, decoded) => {
    if (err) {
      return res.status(500).send({ auth: false, message: 'Failed To authenticate' });
    }

    // Check for 'View Subscriptions' permission
    if (!decoded.permissions || !decoded.permissions.includes('View Subscriptions')) {
      return res.status(403).send({ auth: false, message: 'Access Forbidden' });
    }

    // Only allow access if 'View Subscriptions' permission is present
    const subscriptions = await subscriptionsBLL.getAllSubscriptions();
    res.status(200).send(subscriptions);
  });
});

// Get subscription By ID
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

    // Check for 'View Subscriptions' permission
    if (!decoded.permissions || !decoded.permissions.includes('View Subscriptions')) {
      return res.status(403).send({ auth: false, message: 'Access Forbidden' });
    }

    // Only allow access if 'View Subscriptions' permission is present
    const { id } = req.params;
    const subscription = await subscriptionsBLL.getSubscriptionById(id);
    res.status(200).send(subscription);
  });
});

// Add a subscription
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

    // Check for 'Create Subscriptions' permission
    if (!decoded.permissions || !decoded.permissions.includes('Update Subscriptions')) {
      return res.status(403).send({ auth: false, message: 'Access Forbidden' });
    }

    // Only allow access if 'Create Subscriptions' permission is present
    const obj = req.body;
    const result = await subscriptionsBLL.addSubscription(obj);
    res.status(200).send(result);
  });
});

// Update a subscription
router.route('/:id').put(async (req, res) => {

  const PRIVATE_KEY = 'somekey';
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(401).send({ auth: false, message: 'No Token Provided' });
  }

  jwt.verify(token, PRIVATE_KEY, async (err, decoded) => {
    if (err) {
      return res.status(500).send({ auth: false, message: 'Failed To authenticate' });
    }

    // Check for 'Update Subscriptions' permission
    if (!decoded.permissions || !decoded.permissions.includes('Update Subscriptions')) {
      return res.status(403).send({ auth: false, message: 'Access Forbidden' });
    }

    // Only allow access if 'Update Subscriptions' permission is present
    const { id } = req.params;
    const obj = req.body;
    const result = await subscriptionsBLL.updateSubscription(id, obj);
    res.status(200).send(result);
  });
});

// Delete a subscription
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

    // Check for 'Delete Subscriptions' permission
    if (!decoded.permissions || !decoded.permissions.includes('Delete Subscriptions')) {
      return res.status(403).send({ auth: false, message: 'Access Forbidden' });
    }

    // Only allow access if 'Delete Subscriptions' permission is present
    const { id } = req.params;
    const result = await subscriptionsBLL.deleteSubscription(id);
    res.status(200).send(result);
  });
});

module.exports = router;
