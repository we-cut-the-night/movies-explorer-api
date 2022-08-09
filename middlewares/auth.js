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
    // payload = { _id: '62f2c71b02b9bd77c1e07ac6' };
  } catch (err) {
    next(new AuthError(MSG_NEED_AUTH));
    return;
  }

  req.user = payload;

  next();
};
