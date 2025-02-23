
// authMiddleware.js
const jwt = require('jsonwebtoken');

const getUserFromToken = (token) => {
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.user;
  } catch (error) {
    console.error('Error verifying token:', error);
    return null;
  }
};

const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Format: "Bearer <token>"
  const user = getUserFromToken(token);
  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  req.user = user; // Attach the user to the request object
  next();
};

module.exports = authenticateUser;


// const jwt = require('jsonwebtoken'); // If using JWT for authentication
// const db = require('../db'); // Import your database connection

// // Function to get user from token (example for JWT)
// const getUserFromToken = (token) => {
//   if (!token) return null;

//   try {
//     // Verify the token and decode the user information
//     const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with your secret key
//     return decoded.user; // Assuming the token contains user information
//   } catch (error) {
//     console.error('Error verifying token:', error);
//     return null;
//   }
// };

// // Middleware to authenticate the user
// const authenticateUser = (req, res, next) => {
//   // Get the token from the request headers
//   const token = req.headers.authorization?.split(' ')[1]; // Format: "Bearer <token>"

//   // Verify the token and get the user
//   const user = getUserFromToken(token);

//   if (!user) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }

//   // Attach the user to the request object
//   req.user = user;
//   next();
// };

// module.exports = {
//   authenticateUser,
// };