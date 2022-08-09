const NotFoundErr = require('../errors/404-not-found-err');
const BadReqErr = require('../errors/400-bad-req-err');
const { MSG_NOTHING_FOUND, MSG_NOT_VALID_ERR } = require('./constants');

module.exports.handleError = (res, err, next) => {
  if (err.message === 'notFoundErr') {
    next(new NotFoundErr(MSG_NOTHING_FOUND));
    return;
  }
  if (err.name === 'CastError' || err.name === 'ValidationError') {
    next(new BadReqErr(MSG_NOT_VALID_ERR));
    return;
  } next(err);
};
