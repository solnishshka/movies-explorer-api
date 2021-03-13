const login = require('./signin');
const createUser = require('./signup');
const usersRoute = require('./users');
const moviesRoute = require('./movies');

module.exports = {
  login,
  createUser,
  usersRoute,
  moviesRoute,
};
