const validator = require('validator');
const { celebrate, Joi } = require('celebrate');
const BadReqErr = require('../errors/400-bad-req-err');

const checkUrlIsValid = (url) => {
  if (validator.isURL(url)) {
    return url;
  }
  throw new BadReqErr('Некорректный URL');
};

const validateSignup = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
});

const validateSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateCreateMovie = celebrate({
  body: Joi.object().keys({
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    year: Joi.string().required(),
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(checkUrlIsValid),
    trailerLink: Joi.string().required().custom(checkUrlIsValid),
    thumbnail: Joi.string().required().custom(checkUrlIsValid),
  }),
});

const validateDeleteMovie = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
});

const validateUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

module.exports = {
  validateSignup,
  validateSignin,
  validateCreateMovie,
  validateDeleteMovie,
  validateUpdateUser,
};
