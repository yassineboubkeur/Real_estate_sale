import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'; // Import social media icons

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white py-3"> {/* Reduced padding */}
      <div className="container">
        <div className="row">
          {/* Footer About Section */}
          <div className="col-md-4 mb-3"> {/* Reduced margin-bottom */}
            <h5 className="h6 mb-2">About Us</h5> {/* Smaller heading */}
            <p className="text-muted small"> {/* Smaller text */}
              MyApp is a leading platform for finding your dream home. We provide the best properties and services to our customers.
            </p>
          </div>

          {/* Footer Links Section */}
          <div className="col-md-4 mb-3"> {/* Reduced margin-bottom */}
            <h5 className="h6 mb-2">Quick Links</h5> {/* Smaller heading */}
            <ul className="list-unstyled">
              <li>
                <a href="/home" className="text-muted text-decoration-none small">Home</a> {/* Smaller text */}
              </li>
              <li>
                <a href="/properties" className="text-muted text-decoration-none small">Properties</a> {/* Smaller text */}
              </li>
              <li>
                <a href="/about" className="text-muted text-decoration-none small">About Us</a> {/* Smaller text */}
              </li>
              <li>
                <a href="/contact" className="text-muted text-decoration-none small">Contact Us</a> {/* Smaller text */}
              </li>
            </ul>
          </div>

          {/* Footer Social Media Section */}
          <div className="col-md-4 mb-3"> {/* Reduced margin-bottom */}
            <h5 className="h6 mb-2">Follow Us</h5> {/* Smaller heading */}
            <div className="d-flex justify-content-start">
              <a href="https://facebook.com" className="text-white me-2"> {/* Reduced margin */}
                <FaFacebook size={18} /> {/* Smaller icon */}
              </a>
              <a href="https://twitter.com" className="text-white me-2"> {/* Reduced margin */}
                <FaTwitter size={18} /> {/* Smaller icon */}
              </a>
              <a href="https://instagram.com" className="text-white me-2"> {/* Reduced margin */}
                <FaInstagram size={18} /> {/* Smaller icon */}
              </a>
              <a href="https://linkedin.com" className="text-white">
                <FaLinkedin size={18} /> {/* Smaller icon */}
              </a>
            </div>
          </div>
        </div>

        {/* Footer Copyright Section */}
        <div className="text-center mt-3"> {/* Reduced margin-top */}
          <p className="mb-0 small">&copy; 2025 MyApp. All rights reserved.</p> {/* Smaller text */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;