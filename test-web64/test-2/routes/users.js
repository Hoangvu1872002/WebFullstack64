var express = require('express');
var router = express.Router();
const {
    authLogin
} = require('../controller/userController');

router.post('/login', authLogin);

module.exports = router;