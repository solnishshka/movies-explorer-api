const router = require('express').Router();
const { getUserInfo, updateProfile } = require('../controllers');

router.get('/me', getUserInfo);

router.patch('/me', updateProfile);

module.exports = router;
