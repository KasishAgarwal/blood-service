const express = require('express');
const router = express.Router();
const reg = require('./registration');
const log = require('./login');

router.use('/login', log);
router.use('/user', reg);
module.exports = router;