const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  User.findOne({ email })
    .then((oldUser) => {
      if (oldUser) {
        next(); // new ConflictErr('Пользователь с таким email уже существует')
      } else {
        bcrypt.hash(password, 10)
          .then((hash) => User.create({
            name, about, avatar, email, password: hash,
          }))
          .then((newUser) => res.send({
            name: newUser.name, about: newUser.about, avatar: newUser.avatar,
          }))
          .catch((err) => {}/* handleError(res, err, next) */);
      }
    })
    .catch((err) => {}/* handleError(res, err, next) */);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        next(/* new AuthError('Некорректный email или пароль') */);
      } else {
        bcrypt.compare(password, user.password)
          .then((matched) => {
            if (!matched) {
              next(/* new AuthError('Некорректный email или пароль') */);
            } else {
              const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
              res.send({ token });
            }
          })
          .catch((err) => {}/* handleError(res, err, next) */);
      }
    })
    .catch((err) => {}/* handleError(res, err, next) */);
};
