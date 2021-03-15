require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');
const helmet = require('helmet');

const { PORT = 3000, DATABASE_URL, NODE_ENV } = process.env;

const { errors } = require('celebrate');

const { rateLimiter } = require('./utils/rateLimiter');

const errorHandler = require('./middlewares/errorHandler');
const { logger, errorLogger } = require('./middlewares/logger');

const { databaseUrlDev } = require('./utils/const');

const router = require('./routes');

const app = express();

mongoose.connect(NODE_ENV === 'production' ? DATABASE_URL : databaseUrlDev, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(cors());

app.use(logger);

app.use(rateLimiter);

app.use(helmet());

app.use(express.json());

app.use(express.urlencoded({
  extended: true,
}));

app.use('/', router);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
});
