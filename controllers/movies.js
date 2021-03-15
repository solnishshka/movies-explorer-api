const Movie = require('../models/movie');
const { NotFoundError, BadRequestError, ForbiddenError } = require('../errors/index');
const { messages } = require('../utils/const');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch((err) => next(err));
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie, err) => {
      if (!movie) {
        throw new BadRequestError(err.message);
      }
      Movie.findById(movie._id).populate('owner').then((item) => {
        res.send(item);
      });
    })
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId).populate('owner').then((movie) => {
    if (!movie) {
      throw new NotFoundError(messages[404].movie);
    }
    if (movie.owner._id.toString() !== req.user._id.toString()) {
      throw new ForbiddenError(messages[403].movie);
    }
    Movie.deleteOne(movie).then(() => {
      res.send({ message: messages[200].deleteMovie });
    });
  }).catch(next);
};
