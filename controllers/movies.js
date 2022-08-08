const Movie = require('../models/movie');
const { handleError } = require('../utils/errors');
const NotFoundErr = require('../errors/404-not-found-err');
const ForbiddenErr = require('../errors/403-forbidden-err');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    movieId, nameRU, nameEN, year, country, director, duration,
    description, image, trailerLink, thumbnail,
  } = req.body;

  const owner = req.user._id;
  // const owner = TESTUSER;

  Movie.create({
    movieId,
    nameRU,
    nameEN,
    year,
    country,
    director,
    duration,
    description,
    image,
    trailerLink,
    thumbnail,
    owner,
  })
    .then((card) => res.send(card))
    .catch((err) => { handleError(res, err, next); });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.id)
    .orFail(new NotFoundErr('Фильм не найден'))
    .then((movie) => {
      if (req.user._id !== movie.owner.toString()) {
        next(new ForbiddenErr('Нельзя удалить фильм другого пользователя'));
      } else {
        Movie.findByIdAndRemove(req.params.id)
          .then((removedMovie) => { res.send({ data: removedMovie }); })
          .catch((err) => handleError(res, err, next));
      }
    })
    .catch((err) => handleError(res, err, next));
};
