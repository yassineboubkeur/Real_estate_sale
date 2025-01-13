
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const serviceAccount = require('path to your key');//important  *********************************** // Path to your Firebase service account key
const userRoutes = require('./routes/userRoutes.js'); // Import user routes

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Initialize Express app
const app = express();

// Configure CORS
app.use(
  cors({
    origin: 'http://localhost:5173', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type'], // Allowed headers
  })
);

// Middleware to parse JSON data
app.use(express.json());

// Use user routes
app.use('/api/users', userRoutes);

// Firebase token verification endpoint
app.post('/verifyToken', async (req, res) => {
  const { idToken } = req.body;

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    res.json({ status: 'success', user: decodedToken });
  } catch (error) {
    res.status(401).json({ status: 'error', message: 'Unauthorized' });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


// const express = require('express');
// const cors = require('cors');
// const userRoutes = require('./routes/userRoutes.js'); // Importez les routes utilisateur

// const app = express();

// // Configurer CORS
// app.use(cors({
//   origin: 'http://localhost:5173',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type'],
// }));

// // Middleware pour parser les données JSON
// app.use(express.json());

// // Utiliser les routes utilisateur
// app.use('/api/users', userRoutes);

// // Démarrer le serveur
// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
