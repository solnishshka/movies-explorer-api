require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');
const helmet = require('helmet');

const { PORT = 3000, DATABASE_URL, NODE_ENV } = process.env;

const { errors } = require('celebrate');

const { rateLimiter } = require('./utils/rateLimiter');

const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
const { logger, errorLogger } = require('./middlewares/logger');

const { NotFoundError } = require('./errors/index');
const { messages } = require('./utils/const');

const {
  login,
  createUser,
  usersRoute,
  moviesRoute,
} = require('./routes');

const app = express();

mongoose.connect(NODE_ENV === 'production' ? DATABASE_URL : 'mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(cors());

app.use(rateLimiter);

app.use(helmet());

app.use(express.json());

app.use(express.urlencoded({
  extended: true,
}));

app.use(logger);

app.use('/signup', createUser);
app.use('/signin', login);
app.use('/users', auth, usersRoute);
app.use('/movies', auth, moviesRoute);

app.use('*', (req, res, next) => {
  next(new NotFoundError(messages[404].route));
});

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
});
