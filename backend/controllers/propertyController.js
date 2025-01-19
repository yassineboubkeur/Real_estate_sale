const db = require('../db'); // Database connection

// Controller to add a property with a picture
const addProperty = (req, res) => {
  const { title, description, price, location, size, user_id, picture } = req.body;

  // Data validation
  if (!title || !description || !price || !location || !size || !user_id || !picture) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // SQL query to insert the property
  const sql = `
    INSERT INTO properties (title, description, price, location, size, user_id, picture)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [title, description, price, location, size, user_id, picture];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error adding the property:', err.message);
      return res.status(500).json({ message: 'Server error.' });
    }
    res.status(201).json({ 
      message: 'Property added successfully.', 
      propertyId: result.insertId 
    });
  });
};

// Controller to get all properties
const getAllProperties = (req, res) => {
  const sql = 'SELECT * FROM properties';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error retrieving properties:', err.message);
      return res.status(500).json({ message: 'Server error.' });
    }
    res.status(200).json({ 
      message: 'Properties retrieved successfully.', 
      properties: results 
    });
  });
};

// Controller to update a property
const updateProperty = (req, res) => {
  const { id } = req.params; // Property ID from the URL
  const { title, description, price, location, size, picture } = req.body;

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

// Controller to delete a property
const deleteProperty = (req, res) => {
  const { id } = req.params; // Property ID from the URL

  // SQL query to delete the property
  const sql = 'DELETE FROM properties WHERE id = ?';

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error deleting the property:', err.message);
      return res.status(500).json({ message: 'Server error.' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Property not found.' });
    }
    res.status(200).json({ message: 'Property deleted successfully.' });
  });
};

module.exports = { addProperty, getAllProperties, updateProperty, deleteProperty };