
const express = require('express');
const { addProperty, getAllProperties,updateProperty,deleteProperty } = require('../controllers/propertyController.js');

const router = express.Router();

// Route to add a property
router.post('/add', addProperty);

// Route to get all properties
router.get('/all', getAllProperties);

// Route to update a property
router.put('/update/:id', updateProperty);

// Route to delete a property
router.delete('/delete/:id', deleteProperty);

module.exports = router;
