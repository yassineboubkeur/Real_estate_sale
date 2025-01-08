const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes.js'); // Importez les routes utilisateur

const app = express();

// Configurer CORS
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));

// Middleware pour parser les données JSON
app.use(express.json());

// Utiliser les routes utilisateur
app.use('/api/users', userRoutes);

// Démarrer le serveur
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
