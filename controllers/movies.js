const Movie = require('../models/movie');
const { NotFoundError, BadRequestError } = require('../errors/index');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch((err) => next(err));
};

module.exports.createMovie = (req, res, next) => {
  const { country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId } = req.body;

  Movie.create({ country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId, owner: req.user._id })
    .then((movie, err) => {
      if (!movie) {
        throw new BadRequestError(err.message);
      }
      Movie.findById(movie._id).populate('owner').then((item) => {
        res.send(item);
      });
    })
    .catch(next);
}

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId).populate('owner').then((movie) => {
    if (!movie) {
      throw new NotFoundError(`Фильм с id: ${req.params.movieId} не найден`);
    }
    if (movie.owner._id.toString() !== req.user._id.toString()) {
      throw new ForbiddenError('Можно удалять только свои фильмы');
    }
    Movie.deleteOne(movie).then(() => {
      res.send({ message: `Фильм с id: ${req.params.movieId} успешно удален` });
    });
  }).catch(next);
};