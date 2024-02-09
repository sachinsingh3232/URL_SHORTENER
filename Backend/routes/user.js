const express = require('express');
const { Register, Login, LogOut } = require('../controllers/user');
const isUserAuthenticated = require('../Middleware/auth');
const router = express.Router();

router.route('/register').post(Register)
router.route('/login').post(Login)
router.route('/logout').post(isUserAuthenticated,LogOut)

module.exports = router;