const express = require('express');
const moviesBLL = require('../BLL/moviesBLL');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Entry Point 'http://localhost:8000/movies'

// Get All movies
router.route('/').get(async (req, res) => {

  const PRIVATE_KEY = 'somekey';
  const token = req.headers['x-access-token'];
  if (!token) {
    console.log('No Token Provided')
    return res.status(401).send({ auth: false, message: 'No Token Provided' });
  }

  jwt.verify(token, PRIVATE_KEY, async (err, decoded) => {
    if (err) {
      console.log('Failed To authenticate')
      return res.status(500).send({ auth: false, message: 'Failed To authenticate' });
    }

    // Check for 'View Movies' permission
    if (!decoded.permissions || !decoded.permissions.includes('View Movies')) {
      console.log(decoded.permissions)
      console.log('Access Forbidden')
      return res.status(403).send({ auth: false, message: 'Access Forbidden' });
    }

    // Only allow access if 'View Movies' permission is present
    const movies = await moviesBLL.getAllMovies();
    res.status(200).send(movies);
  });
});

// Get movie By ID
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

    // Check for 'View Movies' permission
    if (!decoded.permissions || !decoded.permissions.includes('View Movies')) {
      return res.status(403).send({ auth: false, message: 'Access Forbidden' });
    }

    // Only allow access if 'View Movies' permission is present
    const { id } = req.params;
    const movie = await moviesBLL.getMovieById(id);
    res.status(200).send(movie);
  });
});

// Add a movie
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
    // Check for 'Create Movies' permission
    if (!decoded.permissions || !decoded.permissions.includes('Create Movies')) {
      return res.status(403).send({ auth: false, message: 'Access Forbidden' });
    }

    // Only allow access if 'Create Movies' permission is present
    const obj = req.body;
    const result = await moviesBLL.addMovie(obj);
    res.status(200).send(result);
  });
});

// Update a movie
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

    // Check for 'Update Movie' permission
    if (!decoded.permissions || !decoded.permissions.includes('Update Movie')) {
      return res.status(403).send({ auth: false, message: 'Access Forbidden' });
    }

    // Only allow access if 'Update Movie' permission is present
    const { id } = req.params;
    const obj = req.body;
    const result = await moviesBLL.updateMovie(id, obj);;
    res.status(200).send(result);
  });
});

// Delete a movie
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

    // Check for 'Delete Movies' permission
    if (!decoded.permissions || !decoded.permissions.includes('Delete Movies')) {
      return res.status(403).send({ auth: false, message: 'Access Forbidden' });
    }

    // Only allow access if 'Delete Movies' permission is present
    const { id } = req.params;
    const result = await moviesBLL.deleteMovie(id);
    res.status(200).send(result);
  });
});

module.exports = router;
