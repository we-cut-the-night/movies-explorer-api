const router = require('express').Router();
const { getMyUser, updateUser } = require('../controllers/users');
const { validateUpdateUser } = require('../middlewares/validator');

router.get('/me', getMyUser);
router.patch('/me', validateUpdateUser, updateUser);

module.exports = router;
