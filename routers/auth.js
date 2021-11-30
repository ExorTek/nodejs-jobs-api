const express = require('express');
const router = express.Router();
const { login, register,test } = require('../controller/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/test', test);

module.exports = router;