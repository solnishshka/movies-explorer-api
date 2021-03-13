const router = require('express').Router();
const { createUser } = require('../controllers');
const { signupValidator } = require('../middlewares/validators');

router.post('/', signupValidator, createUser);

module.exports = router;
