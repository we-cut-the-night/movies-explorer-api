const mongoose = require('mongoose');
const validator = require('validator');
const { MSG_NEED_URL } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  movieId: { type: Number, required: true, unique: true },
  nameRU: { type: String, required: true },
  nameEN: { type: String, required: true },
  country: { type: String, required: true },
  director: { type: String, required: true },
  duration: { type: Number, required: true },
  description: { type: String, required: true },
  year: { type: String, required: true },
  image: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: MSG_NEED_URL,
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: MSG_NEED_URL,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: MSG_NEED_URL,
    },
  },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
});

module.exports = mongoose.model('movie', movieSchema);
