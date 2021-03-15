const router = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers');
const { createMovieValidator, movieIdValidator } = require('../middlewares/validators');

router.get('/', getMovies);

router.post('/', createMovieValidator, createMovie);

router.delete('/:movieId', movieIdValidator, deleteMovie);

module.exports = router;
