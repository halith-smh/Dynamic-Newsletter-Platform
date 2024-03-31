const express = require('express');
const { register, login, loginVerify } = require('../controllers/Authentication');
const { verifyUser } = require('../middleware/User');

const router = express.Router();

//auth-user-registartion
router.post('/register', register);

//auth-user-login
router.post('/login',login);

//auth-login-verify
router.get('/login', verifyUser,loginVerify);


module.exports = router;