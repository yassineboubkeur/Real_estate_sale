const express = require('express');
const router = express.Router();
const {
  addProperty,
  getAllProperties,
  updateProperty,
  deleteProperty,
  getPropertyById,
  getRecentProperties
} = require('../controllers/propertyController');
const upload = require('../config/multerConfig');


// Route to get all properties
router.get('/all', getAllProperties);
router.get('/recent', getRecentProperties);

// Route to get a specific property by ID
router.get('/:id', getPropertyById);

// Route to add a property
router.post('/add', upload.single('picture'), addProperty);

// Route to update a property
router.put('/update/:id', upload.single('picture'), updateProperty);

// Route to delete a property
router.delete('/delete/:id', deleteProperty);

// Route to get recent properties
module.exports = router;