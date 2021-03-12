require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');

const { PORT = 3000 } = process.env;

const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
const { logger, errorLogger } = require('./middlewares/logger');

const { NotFoundError } = require('./errors/index');

const { signin } = require('./controllers/signin');
const { signup } = require('./controllers/signup');

const usersRoute = require('./routes/users');
const moviesRoute = require('./routes/movies');

const app = express();

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(cors());

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(bodyParser.json());

app.use(logger);

app.post("/signup", signup);
app.post("/signin", signin);

app.use("/users", auth, usersRoute);
app.use("/movies", auth, moviesRoute);

app.use('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

app.use(errorLogger);

app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`Application is running on port ${PORT}`);
});