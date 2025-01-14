import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'; // Import social media icons

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white py-5">
      <div className="container">
        <div className="row">
          {/* Footer About Section */}
          <div className="col-md-4 mb-4">
            <h5 className="mb-3">About Us</h5>
            <p className="text-muted">
              MyApp is a leading platform for finding your dream home. We provide the best properties and services to our customers.
            </p>
          </div>

          {/* Footer Links Section */}
          <div className="col-md-4 mb-4">
            <h5 className="mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/home" className="text-muted text-decoration-none">Home</a>
              </li>
              <li>
                <a href="/properties" className="text-muted text-decoration-none">Properties</a>
              </li>
              <li>
                <a href="/about" className="text-muted text-decoration-none">About Us</a>
              </li>
              <li>
                <a href="/contact" className="text-muted text-decoration-none">Contact Us</a>
              </li>
            </ul>
          </div>

          {/* Footer Social Media Section */}
          <div className="col-md-4 mb-4">
            <h5 className="mb-3">Follow Us</h5>
            <div className="d-flex justify-content-start">
              <a href="https://facebook.com" className="text-white me-3">
                <FaFacebook size={24} />
              </a>
              <a href="https://twitter.com" className="text-white me-3">
                <FaTwitter size={24} />
              </a>
              <a href="https://instagram.com" className="text-white me-3">
                <FaInstagram size={24} />
              </a>
              <a href="https://linkedin.com" className="text-white">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Copyright Section */}
        <div className="text-center mt-4">
          <p className="mb-0">&copy; 2025 MyApp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

// const Footer = () => {
//   return (
//     <footer className="bg-dark text-white text-center mt-3 py-3">
//       <p>&copy; 2025 MyApp. All rights reserved.</p>
//     </footer>
//   );
// };

// export default Footer;
