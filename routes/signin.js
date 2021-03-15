const router = require('express').Router();
const { login } = require('../controllers');
const { signinValidator } = require('../middlewares/validators');

router.post('/', signinValidator, login);

module.exports = router;
