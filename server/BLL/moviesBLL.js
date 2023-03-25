const { getAllmoviesFirstTime } = require('../DALS/movieUserDAL');
const { Movie } = require('../models/allModels');

// GET - Get All - Read
const getAllMovies = async () => {
  const count = await Movie.countDocuments({});
  if (count === 0) {
    const { data } = await getAllmoviesFirstTime()
    for (let mov of data) {
      mov = { ...mov, image: mov.image.medium }
      mov.summary = mov.summary.replace(/<\/?p>/g, '').replace(/<\/?b>/g, '').replace(/,/g, '');
      const movieModel = new Movie(mov);
      await movieModel.save();
    }
  }
  let movies = await Movie.find({})
  return movies
};

// GET - Get By Id - read
const getMovieById = (id) => {
  return Movie.findById({ _id: id });
};

// POST - Create
const addMovie = async (obj) => {
  const mov = new Movie(obj);
  await mov.save();
};

// PUT - Update
const updateMovie = async (id, obj) => {
  await Movie.findByIdAndUpdate(id, obj);
};

// DELETE - Delete
const deleteMovie = async (id) => {
  await Movie.findByIdAndDelete(id);
};

module.exports = {
  getAllMovies,
  getMovieById,
  addMovie,
  updateMovie,
  deleteMovie,
};
