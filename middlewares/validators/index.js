const { signupValidator, signinValidator } = require('./authValidators');
const { createMovieValidator, movieIdValidator } = require('./movieValidators');

module.exports = {
  signupValidator,
  signinValidator,
  createMovieValidator,
  movieIdValidator,
};
