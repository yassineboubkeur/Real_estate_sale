
const express = require('express');
const { addProperty, getAllProperties } = require('../controllers/propertyController.js');

const router = express.Router();

// Route to add a property
router.post('/add', addProperty);

// Route to get all properties
router.get('/all', getAllProperties);

module.exports = router;
