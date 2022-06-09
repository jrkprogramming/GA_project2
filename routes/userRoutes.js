const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userController')

router.get('/user/login', userCtrl.showLogin)

module.exports = router;