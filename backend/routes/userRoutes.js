
require('dotenv').config(); 
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');

// Route for user registration
router.post('/register', userController.register);

// Route for user login
router.post('/login', userController.login);

// Route for password recovery
router.post('/recover-password', userController.recoverPassword);

// Route for resetting the password after clicking the link
router.post('/reset-password/:token', userController.resetPassword);

// Route for Google login
router.post('/google-login', userController.googleLogin);

module.exports = router;

