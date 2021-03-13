const { signupValidator, signinValidator } = require('./authValidator');
const { createMovieValidator, movieIdValidator } = require('./movieValidator');

module.exports = {
  signupValidator,
  signinValidator,
  createMovieValidator,
  movieIdValidator,
};
