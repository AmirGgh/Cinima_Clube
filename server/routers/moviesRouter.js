const express = require('express');
const moviesBLL = require('../BLL/moviesBLL');

const router = express.Router();

// Entry Point 'http://localhost:8000/movies'

// Get All movies
router.route('/').get(async (req, res) => {
  const movies = await moviesBLL.getAllMovies();
  res.json(movies);
});

// Get movie By ID
router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  const movie = await moviesBLL.getMovieById(id);
  res.json(movie);
});

// Add a movie
router.route('/').post(async (req, res) => {
  const obj = req.body;
  const result = await moviesBLL.addMovie(obj);
  res.json(result);
});

// Update a movie
router.route('/:id').put(async (req, res) => {
  const { id } = req.params;
  const obj = req.body;
  const result = await moviesBLL.updateMovie(id, obj);
  res.json(result);
});

// Delete a movie
router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;
  const result = await moviesBLL.deleteMovie(id);
  res.json(result);
});

module.exports = router;
