
const db = require('../db'); // Your connection to the database

// Controller to add a property
const addProperty = (req, res) => {
  const { title, description, price, location, size, user_id } = req.body;

  // Validation des données
  if (!title || !description || !price || !location || !size || !user_id) {
    return res.status(400).json({ message: 'Tous les champs sont requis.' });
  }

  // Requête SQL pour insérer la propriété
  const sql = `
    INSERT INTO properties (title, description, price, location, size, user_id)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const values = [title, description, price, location, size, user_id];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Erreur lors de l\'ajout de la propriété:', err.message);
      return res.status(500).json({ message: 'Erreur serveur.' });
    }
    res.status(201).json({ message: 'Propriété ajoutée avec succès.', propertyId: result.insertId });
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
    res.status(200).json({ message: 'Properties successfully recovered.', properties: results });
  });
};

module.exports = { addProperty, getAllProperties };
