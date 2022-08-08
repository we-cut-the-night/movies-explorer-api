const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getMyUser, updateUser } = require('../controllers/users');

router.get('/me', getMyUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
  }),
}), updateUser);

module.exports = router;
