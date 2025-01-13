const express = require('express');
const bcrypt = require('bcrypt');
const { OAuth2Client } = require('google-auth-library'); // Import Google OAuth client
const db = require('../db'); // Import your database configuration

const router = express.Router();

// Initialize OAuth2Client with your Google Client ID
const CLIENT_ID = ''; // Replace with your actual Google Client ID
const client = new OAuth2Client(CLIENT_ID);




// Route for user registration
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

// Route for user login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists in the database
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Database error', error: err });
      }
      if (result.length === 0) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      // Get the user and the hashed password
      const user = result[0];

      // Compare the provided password with the hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      // If authentication is successful
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

// Route for Google login

router.post('/google-login', async (req, res) => {
  const { token } = req.body;  // Expecting the Google token from the frontend

  try {
    // Verify the Google token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: 'YOUR_GOOGLE_CLIENT_ID',  // Verify the client ID
    });

    const payload = ticket.getPayload();  // Decode the token payload
    const email = payload.email;
    const name = payload.name;
    // const picture = payload.picture;  // Picture can be stored in the DB (optional)

    // Check if the user already exists in the database based on the email
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Database error', error: err });
      }

      if (result.length > 0) {
        // If the user exists, return the user data
        const user = result[0];
        return res.status(200).json({
          message: 'Google login successful',
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,  // Optional: Will be null if not provided
            address: user.address,  // Optional: Will be null if not provided
            gender: user.gender,  // Optional: Will be null if not provided
          },
        });
      } else {
        // If the user doesn't exist, create a new user in the database
        // You can leave `password`, `phone`, `address`, and `gender` as `NULL` for now
        db.query(
          'INSERT INTO users (name, email, password, phone, address, gender) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [name, email, null, null, null, null], // Inserting null for missing data
          (err, result) => {
            if (err) {
              return res.status(500).json({ message: 'Database error', error: err });
            }

            return res.status(201).json({
              message: 'User registered through Google login',
              user: {
                id: result.insertId,
                name,
                email,
                // Optional: Include picture URL
                phone: null,  // Optional: Will be null if not provided
                address: null,  // Optional: Will be null if not provided
                gender: null,  // Optional: Will be null if not provided
              },
            });
          }
        );
      }
    });
  } catch (error) {
    return res.status(400).json({ message: 'Google login failed', error });
  }
});

module.exports = router;



// const express = require('express');
// const bcrypt = require('bcrypt');
// const db = require('../db'); // Importez la configuration de la base de données

// const router = express.Router();

// // Route pour l'enregistrement des utilisateurs
// router.post('/register', async (req, res) => {
//   const { name, email, password, phone, address, gender } = req.body;

//   try {
//     db.query('SELECT * FROM users WHERE email = ?', [email], async (err, result) => {
//       if (err) {
//         return res.status(500).json({ message: 'Database error', error: err });
//       }
//       if (result.length > 0) {
//         return res.status(400).json({ message: 'Email already in use' });
//       }

//       const saltRounds = 10;
//       const hashedPassword = await bcrypt.hash(password, saltRounds);

//       db.query(
//         'INSERT INTO users (name, email, password, phone, address, gender) VALUES (?, ?, ?, ?, ?, ?)',
//         [name, email, hashedPassword, phone, address, gender],
//         (err, result) => {
//           if (err) {
//             return res.status(500).json({ message: 'Database error', error: err });
//           }
//           return res.status(201).json({
//             message: 'User registered successfully',
//             userId: result.insertId,
//           });
//         }
//       );
//     });
//   } catch (error) {
//     return res.status(500).json({ message: 'Server error', error });
//   }
// });

// // Route pour le login
// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;
  
//     try {
//       // Vérifiez si l'utilisateur existe dans la base de données
//       db.query('SELECT * FROM users WHERE email = ?', [email], async (err, result) => {
//         if (err) {
//           return res.status(500).json({ message: 'Database error', error: err });
//         }
//         if (result.length === 0) {
//           return res.status(400).json({ message: 'Invalid email or password' });
//         }
  
//         // Récupérez l'utilisateur et son mot de passe hashé
//         const user = result[0];
  
//         // Comparez le mot de passe fourni avec le mot de passe hashé
//         const isPasswordValid = await bcrypt.compare(password, user.password);
  
//         if (!isPasswordValid) {
//           return res.status(400).json({ message: 'Invalid email or password' });
//         }
  
//         // Si l'authentification réussit
//         return res.status(200).json({
//           message: 'Login successful',
//           user: {
//             id: user.id,
//             name: user.name,
//             email: user.email,
//             phone: user.phone,
//             address: user.address,
//             gender: user.gender,
//           },
//         });
//       });
//     } catch (error) {
//       return res.status(500).json({ message: 'Server error', error });
//     }
//   });
  

// module.exports = router;
