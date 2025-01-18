import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavBar.css'; // Custom CSS for the logo
import { useAuth } from '../auth/AuthContext';

const NavBar = () => {
  const { isAuthenticated, logout } = useAuth(); // Get authentication state, logout function
  const location = useLocation(); // Get current route location

  // Retrieve user data from localStorage
  const user = JSON.parse(localStorage.getItem('userr')); // Parse the user object

  return (
    <div>
      <header>
        {/* Navbar */}
        <nav
          className="navbar navbar-expand-lg navbar-dark bg-dark shadow"
          style={{ 
            zIndex: 2000,
            position: 'sticky', // Make navbar sticky
            top: 0, // Stick to the top of the viewport
            padding: "1rem 0", // Increased padding for larger navbar
            height: "80px", // Set a larger fixed height for the navbar
          }}
        >
          <div className="container">
            {/* Logo */}
            <Link className="navbar-brand" to="/">
              <div className="logo">
                <span className="logo-highlight animated-logo">Get</span>
                <span className="bg-danger animated-logo">House</span>
              </div>
              <style jsx>{`
                .logo {
                  font-size: 1.5rem; /* Larger font size */
                  font-weight: bold;
                  display: inline-block;
                  cursor: pointer;
                }
                .logo-highlight {
                  color: #007bff; /* Blue color for "Get" */
                }
                .bg-danger {
                  color: white; /* White text for "House" */
                  padding: 0 3px; /* Increased padding */
                  border-radius: 3px; /* Increased border radius */
                }
                .animated-logo {
                  display: inline-block;
                  opacity: 0;
                  animation: fadeIn 1.5s forwards;
                }
                .animated-logo:nth-child(1) {
                  animation-delay: 0.5s;
                }
                .animated-logo:nth-child(2) {
                  animation-delay: 1s;
                }
                @keyframes fadeIn {
                  to {
                    opacity: 1;
                  }
                }
                .logo:hover .logo-highlight {
                  color: #0056b3; /* Darker blue on hover */
                  transition: color 0.3s ease;
                }
                .logo:hover .bg-danger {
                  background-color: #dc3545; /* Brighter red on hover */
                  transition: background-color 0.3s ease;
                }
              `}</style>
            </Link>

            {/* Navbar Toggler */}
            <button
              className="navbar-toggler p-1" // Increased padding
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i className="fas fa-bars" style={{ fontSize: '1.2rem' }}></i> {/* Larger icon */}
            </button>

            {/* Navbar Links */}
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <Link
                    className={`nav-link p-1 ${location.pathname === '/' ? 'active' : ''}`} // Increased padding
                    to="/"
                    style={{
                      fontSize: '1rem', // Larger font size
                      fontWeight: location.pathname === '/' ? 'bold' : 'normal', // Bold if active
                      borderBottom: location.pathname === '/' ? '2px solid #007bff' : 'none', // Bottom border if active
                    }}
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link p-1 ${location.pathname === '/properties' ? 'active' : ''}`} // Increased padding
                    to="/properties"
                    style={{
                      fontSize: '1rem', // Larger font size
                      fontWeight: location.pathname === '/properties' ? 'bold' : 'normal', // Bold if active
                      borderBottom: location.pathname === '/properties' ? '2px solid #007bff' : 'none', // Bottom border if active
                    }}
                  >
                    Properties
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle p-1" // Increased padding
                    to="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ fontSize: '1rem' }} // Larger font size
                  >
                    More!
                  </Link>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li>
                      <Link className="dropdown-item" to="/about" style={{ fontSize: '1rem' }}>
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/contact" style={{ fontSize: '1rem' }}>
                        Contact Us
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/privacy" style={{ fontSize: '1rem' }}>
                        Privacy Policy
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>

              {/* Search Form */}
              <form className="d-flex me-2"> {/* Increased margin */}
                <input
                  className="form-control me-2 p-1 border-0" // Increased padding
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  style={{ fontSize: '1rem', backgroundColor: 'transparent', color: '#fff' }} // Larger font size
                />
                <button
                  className="btn btn-outline-light p-1 border-0" // Increased padding
                  type="submit"
                  style={{ fontSize: '1rem' }} // Larger font size
                >
                  Search
                </button>
              </form>

              {/* Conditional Rendering Based on Authentication State */}
              <ul className="navbar-nav">
                {isAuthenticated ? (
                  // Show user info and "Disconnect" button if authenticated
                  <div className="d-flex align-items-center">
                    {/* Profile Image Dropdown */}
                    <div className="dropdown">
                      <img
                        className="dropdown-toggle"
                        src="images/profile (2).png"
                        alt="profile"
                        style={{ width: '3rem', cursor: 'pointer' }} // Larger profile image
                        id="profileDropdown"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      />
                      <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
                        <li>
                          <div className="dropdown-item">
                            <strong>Name:</strong> {user?.name}
                          </div>
                        </li>
                        <li>
                          <div className="dropdown-item">
                            <strong>Email:</strong> {user?.email}
                          </div>
                        </li>
                        <li>
                          <div className="dropdown-item">
                            <strong>Phone:</strong> {user?.phone}
                          </div>
                        </li>
                        <li>
                          <div className="dropdown-item">
                            <strong>Address:</strong> {user?.address}
                          </div>
                        </li>
                        <li>
                          <div className="dropdown-item">
                            <strong>Gender:</strong> {user?.gender}
                          </div>
                        </li>
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                        <li>
                          <button
                            className="dropdown-item text-danger"
                            onClick={logout}
                          >
                            Disconnect
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  // Show "Login" and "Register" buttons if not authenticated
                  <div className="d-flex align-items-center">
                    <Link
                      to="/login"
                      className="btn btn-outline-primary me-2 p-1 border-0" // Increased padding and margin
                      style={{ fontSize: '1rem' }} // Larger font size
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="btn btn-primary p-1 border-0" // Increased padding
                      style={{ fontSize: '1rem' }} // Larger font size
                    >
                      Register
                    </Link>
                  </div>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default NavBar;