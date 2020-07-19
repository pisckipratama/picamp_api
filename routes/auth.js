const express = require('express');
const { registerUser, loginUser, getMe, forgotPassword, resetPassword, updateDetails, updatePassword } = require('../controllers/auth.controller');
const router = express.Router();
const { protects } = require('../middleware/auth');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protects, getMe);
router.put('/updatedetails', protects, updateDetails);
router.put('/updatepassword', protects, updatePassword);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);

module.exports = router;