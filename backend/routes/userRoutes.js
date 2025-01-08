const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db'); // Importez la configuration de la base de données

const router = express.Router();

// Route pour l'enregistrement des utilisateurs
router.post('/register', async (req, res) => {
  const { name, email, password, phone, address, gender } = req.body;

  try {
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Database error', error: err });
      }
      if (result.length > 0) {
        return res.status(400).json({ message: 'Email already in use' });
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      db.query(
        'INSERT INTO users (name, email, password, phone, address, gender) VALUES (?, ?, ?, ?, ?, ?)',
        [name, email, hashedPassword, phone, address, gender],
        (err, result) => {
          if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
          }
          return res.status(201).json({
            message: 'User registered successfully',
            userId: result.insertId,
          });
        }
      );
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
});

// Route pour le login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Vérifiez si l'utilisateur existe dans la base de données
      db.query('SELECT * FROM users WHERE email = ?', [email], async (err, result) => {
        if (err) {
          return res.status(500).json({ message: 'Database error', error: err });
        }
        if (result.length === 0) {
          return res.status(400).json({ message: 'Invalid email or password' });
        }
  
        // Récupérez l'utilisateur et son mot de passe hashé
        const user = result[0];
  
        // Comparez le mot de passe fourni avec le mot de passe hashé
        const isPasswordValid = await bcrypt.compare(password, user.password);
  
        if (!isPasswordValid) {
          return res.status(400).json({ message: 'Invalid email or password' });
        }
  
        // Si l'authentification réussit
        return res.status(200).json({
          message: 'Login successful',
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address,
            gender: user.gender,
          },
        });
      });
    } catch (error) {
      return res.status(500).json({ message: 'Server error', error });
    }
  });
  

module.exports = router;
