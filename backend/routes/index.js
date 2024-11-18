const express = require('express');
const router = express.Router();
const user = require('./user');
const transaction = require('./transaction');
const account = require('./account');


router.use('/user', user)
router.use('/transaction', transaction)
router.use('/account', account)
module.exports = router;


