const bcrypt = require('bcrypt');
const { OAuth2Client } = require('google-auth-library');
const db = require('../db'); // Import your database configuration
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// Initialize OAuth2Client with your Google Client ID
const CLIENT_ID = ''; // Replace with your actual Google Client ID
const client = new OAuth2Client(CLIENT_ID);

// Register a new user
const register = async (req, res) => {
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
};

// Login user
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Database error', error: err });
      }
      if (result.length === 0) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      const user = result[0];
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

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
};

// Password reset endpoint
const resetPassword = (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(400).json({ message: 'The link is invalid or has expired' });
      }

      const email = decoded.email;
      const hashedPassword = bcrypt.hashSync(newPassword, 10);

      db.query('UPDATE users SET password = ? WHERE email = ?', [hashedPassword, email], (err, result) => {
        if (err) {
          return res.status(500).json({ message: 'Error occurred while updating the password' });
        }
        return res.status(200).json({ message: 'Password updated successfully' });
      });
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

// Request password recovery
const recoverPassword = (req, res) => {
  const { email } = req.body;

  try {
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
      if (result.length === 0) {
        return res.status(400).json({ message: 'Email does not exist' });
      }

      const user = result[0];
      const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY, { expiresIn: '1h' });
      const resetUrl = `http://localhost:5173/reset-password/${token}`;

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Password Reset',
        text: `Click on the following link to reset your password: ${resetUrl}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).json({ message: 'Error sending email' });
        }

        return res.status(200).json({ message: 'Password reset link sent to your email', token });
      });
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

// Google login
const googleLogin = async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const email = payload.email;
    const name = payload.name;

    db.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Database error', error: err });
      }

      if (result.length > 0) {
        const user = result[0];
        return res.status(200).json({
          message: 'Google login successful',
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address,
            gender: user.gender,
          },
        });
      } else {
        db.query(
          'INSERT INTO users (name, email, password, phone, address, gender) VALUES (?, ?, ?, ?, ?, ?)',
          [name, email, null, null, null, null],
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
                phone: null,
                address: null,
                gender: null,
              },
            });
          }
        );
      }
    });
  } catch (error) {
    return res.status(400).json({ message: 'Google login failed', error });
  }
};

module.exports = {
  register,
  login,
  resetPassword,
  recoverPassword,
  googleLogin,
};
