const router = require('express').Router();
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const userRouter = require('./users');
const movieRouter = require('./movies');

router.post('/signup', createUser);
router.post('/signin', login);

router.use('/users', auth, userRouter);
router.use('/movies', auth, movieRouter);

module.exports = router;
