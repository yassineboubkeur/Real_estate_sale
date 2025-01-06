const express = require('express');
const cors = require('cors');
const db = require('./db'); // Importez la configuration de la base de données (si elle existe)

const app = express();

// Configurer CORS pour permettre les requêtes depuis http://localhost:5173
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));

// Middleware pour parser les données JSON
app.use(express.json());

// Route pour l'enregistrement des utilisateurs
app.post('/register', (req, res) => {
  const { name, email, password, phone, address, gender } = req.body;

  // Vérifiez si l'utilisateur existe déjà
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err });
    }
    if (result.length > 0) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Si l'email est unique, insérer les données de l'utilisateur
    db.query(
      'INSERT INTO users (name, email, password, phone, address, gender) VALUES (?, ?, ?, ?, ?, ?)',
      [name, email, password, phone, address, gender],
      (err, result) => {
        if (err) {
          return res.status(500).json({ message: 'Database error', error: err });
        }
        return res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
      }
    );
  });
});

// Démarrer le serveur
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
