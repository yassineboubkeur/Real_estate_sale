

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

// 
const getRecentProperties = (req, res) => {
  // SQL query to fetch the 3 most recent properties
  const sql = "SELECT * FROM properties ORDER BY created_at DESC LIMIT 3";

  // console.log("Executing SQL query:", sql); // Log the SQL query

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error retrieving recent properties:", err.message);
      return res.status(500).json({ message: "Server error." });
    }
    // return res.status(407).json({ message: "hello " });

    // console.log("Query results:", results); // Log the query results

    if (results.length === 0) {
      return res.status(404).json({ message: "No properties found." });
    }

    res.status(200).json({
      message: "Recent properties retrieved successfully.",
      properties: results,
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
// controllers/propertyController.js
const updateProperty = (req, res) => {
  const { id } = req.params; // Property ID from the URL
  const { title, description, price, location, size } = req.body;
  const picture = req.file ? req.file.filename : req.body.picture; // Use existing picture if no new upload

  // Data validation
  if (!title || !description || !price || !location || !size || !picture) {
    return res.status(400).json({ message: 'All fields are required to update the property.' });
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
      console.error('Error updating the property:', err.message);
      return res.status(500).json({ message: 'Server error.' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Property not found.' });
    }
    res.status(200).json({ message: 'Property updated successfully.' });
  });
};

// Controller to get a specific property by ID
// controllers/propertyController.js
const getPropertyById = (req, res) => {
  const { id } = req.params; // Property ID from the URL

  // SQL query to retrieve the property by ID
  const sql = 'SELECT * FROM properties WHERE id = ?';

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Error retrieving the property:', err.message);
      return res.status(500).json({ message: 'Server error.' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Property not found.' });
    }
    res.status(200).json({
      message: 'Property retrieved successfully.',
      property: results[0],
    });
  });
};

// Controller to delete a property
// controllers/propertyController.js
const deleteProperty = (req, res) => {
  const { id } = req.params; // Property ID from the URL

  // Validate the ID
  if (!id || isNaN(id)) {
    return res.status(400).json({ status: 'error', message: 'Invalid property ID.' });
  }

  // console.log(`Attempting to delete property with ID: ${id}`);

  // Get the user ID from the request (assuming it's passed in the request body)
  const userId = req.body.user_id;

  if (!userId) {
    return res.status(401).json({ status: 'error', message: 'Unauthorized. User ID is required.' });
  }

  // First, check if the property belongs to the user
  const checkSql = 'SELECT user_id FROM properties WHERE id = ?';
  db.query(checkSql, [id], (err, results) => {
    if (err) {
      console.error('Error checking property ownership:', err.message);
      return res.status(500).json({ status: 'error', message: 'Something went wrong!', error: err.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ status: 'error', message: 'Property not found.' });
    }

    const propertyUserId = results[0].user_id;

    if (propertyUserId !== userId) {
      return res.status(403).json({ status: 'error', message: 'Forbidden: You do not have permission to delete this property.' });
    }

    // Now delete the property
    db.query('DELETE FROM properties WHERE id = ?', [id], (err, result) => {
      if (err) {
        console.error('Error deleting the property:', err.message);
        return res.status(500).json({ status: 'error', message: 'Something went wrong!', error: err.message });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ status: 'error', message: 'Property not found.' });
      }

      console.log(`Property with ID: ${id} deleted successfully.`);
      res.status(200).json({ status: 'success', message: 'Property deleted successfully.' });
    });
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


// get recent endpoint 


// const getRecentProperties = (req, res) => {
//   const sql = "SELECT * FROM properties";

//   db.query(sql, (err, results) => {
//     if (err) {
//       console.error("Error retrieving properties:", err.message);
//       return res.status(500).json({ message: "Server error." });
//     }
//     res.status(200).json({
//       message: "Properties retrieved successfully.",
//       properties: results,
//     });
//   });
// };
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
  getPropertyById ,
  getRecentProperties

};
