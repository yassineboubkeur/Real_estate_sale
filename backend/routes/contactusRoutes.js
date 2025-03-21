const express = require('express');
const router = express.Router();
const { contactUs } = require('../controllers/contactusController.js'); // Adjust the path as needed

// Contact Us route
router.post('/contact', contactUs);

module.exports = router;