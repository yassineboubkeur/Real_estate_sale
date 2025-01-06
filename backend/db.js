const mysql = require('mysql2');

// Configurer la connexion MySQL
const db = mysql.createConnection({
  host: 'localhost',       // Adresse du serveur MySQL
  user: 'root',            // Nom d'utilisateur MySQL
  password: '',            // Mot de passe MySQL
  database: 'real_estate_sale',  // Nom de la base de données
});

// Essayer de se connecter
db.connect(err => {
  if (err) {
    console.error('Erreur de connexion à la base de données :', err);
    process.exit(); // Arrêter si la connexion échoue
  }
  console.log('Connecté à la base de données MySQL : real_estate_sale');
});

module.exports = db;
