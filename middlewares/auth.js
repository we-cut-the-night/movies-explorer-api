const jwt = require('jsonwebtoken');
const AuthError = require('../errors/401-auth-err');
const { MSG_NEED_AUTH } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new AuthError(MSG_NEED_AUTH));
    return;
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    next(new AuthError(MSG_NEED_AUTH));
    return;
  }

  req.user = payload;
  // req.user = { _id: '62f2c6cd02b9bd77c1e07ac3' };

  next();
};
