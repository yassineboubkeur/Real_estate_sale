// middleware/authMiddleware.js
const authenticateUser = (req, res, next) => {
  // Assuming you have a way to get the user ID from the request (e.g., from a JWT token)
  const userId = req.user.id; // Adjust this based on your authentication setup

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  req.userId = userId; // Attach the user ID to the request object
  next();
};

const authorizePropertyAccess = (req, res, next) => {
  const { id } = req.params; // Property ID from the URL
  const userId = req.userId;

  // Query the database to check if the property belongs to the user
  const sql = 'SELECT user_id FROM properties WHERE id = ?';
  db.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Property not found' });
    }

    const propertyUserId = results[0].user_id;

    if (propertyUserId !== userId) {
      return res.status(403).json({ message: 'Forbidden: You do not have permission to access this property' });
    }

    next();
  });
};

module.exports = {
  authenticateUser,
  authorizePropertyAccess,
};