import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; // Custom CSS for the logo

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
            {/* Logo */}
            <Link className="navbar-brand" to="/home">
              <div className="logo">
                <span className="logo-highlight">Get</span> House
              </div>
            </Link>

            {/* Navbar Toggler */}
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

            {/* Navbar Links */}
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <Link className="nav-link active" to="/home">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to="/properties">
                    Properties
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    More!
                  </Link>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li>
                      <Link className="dropdown-item" to="/about">
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/contact">
                        Contact Us
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/privacy">
                        Privacy Policy
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>

              {/* Search Form */}
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

              {/* Login and Register Buttons */}
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

// import logo from '../assets/images/logo1.jpeg';
// import { Link } from 'react-router-dom';

// const NavBar = () => {
//   return (
//     <div>
//       <header>
//         {/* Navbar */}
//         <nav
//           className="navbar navbar-expand-lg navbar-dark bg-dark shadow"
//           style={{ zIndex: 2000 }}
//         >
//           <div className="container">
//             <Link className="navbar-brand" to="/home">
//             <img src={logo} alt="Logo" style={{ height: '40px'  }} /> {/* Logo ajusté */}
//             </Link>
//             <button
//               className="navbar-toggler"
//               type="button"
//               data-bs-toggle="collapse"
//               data-bs-target="#navbarNav"
//               aria-controls="navbarNav"
//               aria-expanded="false"
//               aria-label="Toggle navigation"
//             >
//               <i className="fas fa-bars"></i>
//             </button>

//             <div className="collapse navbar-collapse" id="navbarNav">
//               <ul className="navbar-nav me-auto">
//                 <li className="nav-item">
//                   <Link className="nav-link active" to="/home">
//                     Home
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link className="nav-link active" to="/about">
//                     About Us
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link className="nav-link active" to="/properties">
//                     Properties
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                 <Link className="nav-link active" to="/contact">
//                     Contact Us
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                 <Link className="nav-link active" to="/privacy">
//                     Privacy Policy
//                   </Link>
//                 </li>
//               </ul>
//               <form className="d-flex me-3">
//                 <input
//                   className="form-control me-2"
//                   type="search"
//                   placeholder="Search"
//                   aria-label="Search"
//                 />
//                 <button className="btn btn-outline-light" type="submit">
//                   Search
//                 </button>
//               </form>
//               <ul className="navbar-nav">
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/login">
//                     <button className="btn btn-outline-primary">Login</button>
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/register">
//                     <button className="btn btn-primary">Register</button>
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </nav>
//       </header>
//     </div>
//   );
// };

// export default NavBar;
