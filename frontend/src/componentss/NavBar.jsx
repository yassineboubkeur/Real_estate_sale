import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import './NavBar.css';

const NavBar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const location = useLocation();
const userr=JSON.parse(localStorage.getItem("userr"))
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <div className="logo">
            <img className="logoicon" src="../images/logoreal.png" alt="logoreal" />
          </div>
        </Link>
        <button
          className="navbar-toggler p-1"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars" style={{ fontSize: '1.2rem' }}></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className={`nav-link p-1 ${location.pathname === '/' ? 'active' : ''}`} to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link p-1 ${location.pathname === '/properties' ? 'active' : ''}`} to="/properties">
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
          <ul className="navbar-nav">
            {isAuthenticated ? (
              <div className="d-flex align-items-center">
                <div className="dropdown">
                  <img
                    className="dropdown-toggle"
                    src="images/profile (2).png"
                    alt="profile"
                    style={{ width: '3rem', cursor: 'pointer' }}
                    id="profileDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  />
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
                    <li>
                      {console.log((userr).name)}
                      <div className="dropdown-item">
                        <strong>{userr?.name}</strong> 
                        
                      </div>
                    </li>
                    <li>
                      <button className="dropdown-item text-danger" onClick={logout}>
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="d-flex align-items-center">
                <Link to="/login" className="btn btn-outline-primary me-2 p-1 border-0">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary p-1 border-0">
                  Register
                </Link>
                {console.log(isAuthenticated)}
              </div>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;