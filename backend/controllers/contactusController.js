const db = require('../db'); // Import your database configuration

// Handle contact form submission
const contactUs = async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  try {
    // Validate required fields
    if (!name || !email || !phone || !subject || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Insert the contact form data into the database
    const query = `
      INSERT INTO contact_us (name, email, phone, subject, message)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.query(query, [name, email, phone, subject, message], (err, result) => {
      if (err) {
        console.error('Error inserting data into MySQL:', err);
        return res.status(500).json({ message: 'Failed to submit form', error: err });
      }

      console.log('Contact form data inserted into MySQL:', result);
      return res.status(201).json({ message: 'Form submitted successfully' });
    });
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  contactUs
};