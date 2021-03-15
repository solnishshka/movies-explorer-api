const router = require('express').Router();

const auth = require('../middlewares/auth');
const login = require('./signin');
const createUser = require('./signup');
const usersRoute = require('./users');
const moviesRoute = require('./movies');

const { NotFoundError } = require('../errors/NotFoundError');
const { messages } = require('../utils/const');

router.use('/signin', login);
router.use('/signup', createUser);

router.use(auth);

router.use('/users', usersRoute);
router.use('/movies', moviesRoute);

router.use('*', (req, res, next) => {
  next(new NotFoundError(messages[404].route));
});

module.exports = router;
