const router = require('express').Router();
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { validateSignup, validateSignin } = require('../middlewares/validator');
const userRouter = require('./users');
const movieRouter = require('./movies');
const NotFoundErr = require('../errors/404-not-found-err');
const { MSG_PAGE_NOT_FOUND } = require('../utils/constants');

router.post('/signup', validateSignup, createUser);
router.post('/signin', validateSignin, login);
router.use('/users', auth, userRouter);
router.use('/movies', auth, movieRouter);
router.use('*', auth, (req, res, next) => next(new NotFoundErr(MSG_PAGE_NOT_FOUND)));

module.exports = router;
