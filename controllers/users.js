const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { handleError } = require('../utils/errors');
const { MSG_USER_EXISTS, MSG_AUTH_ERR, MSG_USER_NOT_FOUND } = require('../utils/constants');
const AuthError = require('../errors/401-auth-err');
const NotFoundErr = require('../errors/404-not-found-err');
const ConflictErr = require('../errors/409-conflict-err');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.createUser = (req, res, next) => {
  const { email, password, name } = req.body;

  User.findOne({ email })
    .then((oldUser) => {
      if (oldUser) {
        next(new ConflictErr(MSG_USER_EXISTS));
      } else {
        bcrypt.hash(password, 10)
          .then((hash) => User.create({
            email, password: hash, name,
          }))
          .then((newUser) => res.send({
            name: newUser.name,
          }))
          .catch((err) => handleError(res, err, next));
      }
    })
    .catch((err) => handleError(res, err, next));
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        next(new AuthError(MSG_AUTH_ERR));
      } else {
        bcrypt.compare(password, user.password)
          .then((matched) => {
            if (!matched) {
              next(new AuthError(MSG_AUTH_ERR));
            } else {
              const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
              res.send({ token });
            }
          })
          .catch((err) => handleError(res, err, next));
      }
    })
    .catch((err) => handleError(res, err, next));
};

module.exports.getMyUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundErr(MSG_USER_NOT_FOUND))
    .then((user) => res.send(user))
    .catch((err) => handleError(res, err, next));
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => handleError(res, err, next));
};
