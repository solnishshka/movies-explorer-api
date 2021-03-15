const { getMovies, createMovie, deleteMovie } = require('./movies');
const { getUserInfo, updateProfile } = require('./users');
const { createUser, login } = require('./auth');

module.exports = {
  createUser,
  login,
  getUserInfo,
  updateProfile,
  getMovies,
  createMovie,
  deleteMovie,
};
