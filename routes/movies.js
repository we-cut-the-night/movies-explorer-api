const router = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { validateCreateMovie, validateDeleteMovie } = require('../middlewares/validator');

router.get('/', getMovies);
router.post('/', validateCreateMovie, createMovie);
router.delete('/:id', validateDeleteMovie, deleteMovie);

module.exports = router;
