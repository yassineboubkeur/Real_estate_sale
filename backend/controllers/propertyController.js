

const db = require("../db"); // Database connection
const multer = require('multer');

// Controller to add a property with a picture
const addProperty = (req, res) => {
  const { title, description, price, location, size, user_id } =
    req.body;

  // Data validation
  const picture = req.file ? req.file.filename : null;
  if (!title || !description || !price || !location || !size || !user_id || !picture) {
    return res.status(400).json({ message: "All fields are required." });
  }
  // const values = [title, description, price, location, size, user_id, picture];
  

  // SQL query to insert the property
  const sql = `
    INSERT INTO properties (title, description, price, location, size, user_id, picture)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [title, description, price, location, size, user_id, picture];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error adding the property:", err.message);
      return res.status(500).json({ message: "Server error." });
    }
    res.status(201).json({
      message: "Property added successfully.",
      propertyId: result.insertId,
    });
  });
};

// Controller to get all properties
const getAllProperties = (req, res) => {
  const sql = "SELECT * FROM properties";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error retrieving properties:", err.message);
      return res.status(500).json({ message: "Server error." });
    }
    res.status(200).json({
      message: "Properties retrieved successfully.",
      properties: results,
    });
  });
};

// Controller to update a property
const updateProperty = (req, res) => {
  const { id } = req.params; // Property ID from the URL
  const { title, description, price, location, size } = req.body;
  const picture = req.file ? req.file.filename : req.body.picture; // Use existing picture if no new upload

  // Data validation
  if (!title || !description || !price || !location || !size || !picture) {
    return res
      .status(400)
      .json({ message: "All fields are required to update the property." });
  }

  // SQL query to update the property
  const sql = `
    UPDATE properties 
    SET title = ?, description = ?, price = ?, location = ?, size = ?, picture = ?
    WHERE id = ?
  `;
  const values = [title, description, price, location, size, picture, id];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error updating the property:", err.message);
      return res.status(500).json({ message: "Server error." });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Property not found." });
    }
    res.status(200).json({ message: "Property updated successfully." });
  });
};

// Controller to get a specific property by ID
const getPropertyById = (req, res) => {
  const { id } = req.params; // Property ID from the URL

  // SQL query to retrieve the property by ID
  const sql = "SELECT * FROM properties WHERE id = ?";

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Error retrieving the property:", err.message);
      return res.status(500).json({ message: "Server error." });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Property not found." });
    }
    res.status(200).json({
      message: "Property retrieved successfully.",
      property: results[0],
    });
  });
};

// Controller to delete a property
const deleteProperty = (req, res) => {
  const { id } = req.params; // Property ID from the URL

  // SQL query to delete the property
  const sql = "DELETE FROM properties WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error deleting the property:", err.message);
      return res.status(500).json({ message: "Server error." });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Property not found." });
    }
    res.status(200).json({ message: "Property deleted successfully." });
  });
};

// Set up Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory to store uploaded files
  },
  filename: (req, file, cb) => {
    // Generate a unique filename using timestamp and original file extension
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Filter to allow only image files (optional)
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'), false);
  }
};

// Initialize Multer middleware
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // Limit file size to 5 MB
});

module.exports = {
  addProperty,
  getAllProperties,
  updateProperty,
  deleteProperty,
  getPropertyById 

};
