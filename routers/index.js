const express = require('express');
const router = express.Router();
const auth = require('./auth');
const jobs = require('./jobs');

router.use('/auth', auth);
router.use('/jobs', jobs);

module.exports = router;