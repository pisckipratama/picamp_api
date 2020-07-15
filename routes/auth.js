const express = require('express');
const { registerUser, loginUser, getMe, forgotPassword, resetPassword } = require('../controllers/auth.controller');
const router = express.Router();
const { protects } = require('../middleware/auth');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protects, getMe);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);

module.exports = router;