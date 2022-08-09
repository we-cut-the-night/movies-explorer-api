const limit = require('express-rate-limit');

module.exports.rateLimiter = limit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
