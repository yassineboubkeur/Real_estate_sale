// import React from "react";
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div>
      <header>
        {/* Navbar */}
        <nav
          className="navbar navbar-expand-lg navbar-dark bg-dark shadow"
          style={{ zIndex: 2000 }}
        >
          <div className="container">
            <Link className="navbar-brand" to="/">
              <strong>MDB</strong>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i className="fas fa-bars"></i>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <Link className="nav-link active" to="/home">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to="#intro">
                    About Us
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to="#intro">
                    Properties
                  </Link>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="#"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
              <form className="d-flex me-3">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn btn-outline-light" type="submit">
                  Search
                </button>
              </form>
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    <button className="btn btn-outline-primary">Login</button>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    <button className="btn btn-primary">Register</button>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        
      </header>
    </div>
  );
};

export default NavBar;
