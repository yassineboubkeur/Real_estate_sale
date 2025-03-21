// Charger les variables d'environnement depuis le fichier .env
require('dotenv').config();

// Configurer la connexion MySQL avec les valeurs des variables d'environnement
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: process.env.DB_HOST,       // Lire l'adresse du serveur MySQL depuis le fichier .env
  user: process.env.DB_USER,       // Lire le nom d'utilisateur MySQL depuis le fichier .env
  password: process.env.DB_PASSWORD, // Lire le mot de passe MySQL depuis le fichier .env
  database: process.env.DB_NAME    // Lire le nom de la base de données depuis le fichier .env
});

// Essayer de se connecter
db.connect(err => {
  if (err) {
    console.error('Erreur de connexion à la base de données :', err);
    process.exit(); // Arrêter si la connexion échoue
  }
  console.log('Connecté à la base de données MySQL :', process.env.DB_NAME);
});

module.exports = db;
