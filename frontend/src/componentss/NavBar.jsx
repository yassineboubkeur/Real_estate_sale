import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavBar.css'; // Custom CSS for the logo
import { useAuth } from '../auth/AuthContext';

const NavBar = () => {
  const { isAuthenticated, logout, user } = useAuth(); // Get authentication state, logout function, and user data
  const location = useLocation(); // Get current route location

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
            padding: "0.5rem 0", // Reduced padding for smaller navbar
            height: "50px", // Set a smaller fixed height for the navbar
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
                  font-size: 1rem; /* Smaller font size */
                  font-weight: bold;
                  display: inline-block;
                  cursor: pointer;
                }
                .logo-highlight {
                  color: #007bff; /* Blue color for "Get" */
                }
                .bg-danger {
                  color: white; /* White text for "House" */
                  padding: 0 1px; /* Reduced padding */
                  border-radius: 1px; /* Reduced border radius */
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
              className="navbar-toggler p-0" // Reduced padding
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i className="fas fa-bars" style={{ fontSize: '0.8rem' }}></i> {/* Smaller icon */}
            </button>

            {/* Navbar Links */}
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <Link
                    className={`nav-link p-0 ${location.pathname === '/' ? 'active' : ''}`} // Reduced padding
                    to="/"
                    style={{
                      fontSize: '0.8rem', // Smaller font size
                      fontWeight: location.pathname === '/' ? 'bold' : 'normal', // Bold if active
                      borderBottom: location.pathname === '/' ? '2px solid #007bff' : 'none', // Bottom border if active
                    }}
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link p-0 ${location.pathname === '/properties' ? 'active' : ''}`} // Reduced padding
                    to="/properties"
                    style={{
                      fontSize: '0.8rem', // Smaller font size
                      fontWeight: location.pathname === '/properties' ? 'bold' : 'normal', // Bold if active
                      borderBottom: location.pathname === '/properties' ? '2px solid #007bff' : 'none', // Bottom border if active
                    }}
                  >
                    Properties
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle p-0" // Reduced padding
                    to="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ fontSize: '0.8rem' }} // Smaller font size
                  >
                    More!
                  </Link>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li>
                      <Link className="dropdown-item" to="/about" style={{ fontSize: '0.8rem' }}>
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/contact" style={{ fontSize: '0.8rem' }}>
                        Contact Us
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/privacy" style={{ fontSize: '0.8rem' }}>
                        Privacy Policy
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>

              {/* Search Form */}
              <form className="d-flex me-1"> {/* Reduced margin */}
                <input
                  className="form-control me-1 p-0 border-0" // Reduced padding
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  style={{ fontSize: '0.8rem', backgroundColor: 'transparent', color: '#fff' }} // Smaller font size
                />
                <button
                  className="btn btn-outline-light p-0 border-0" // Reduced padding
                  type="submit"
                  style={{ fontSize: '0.8rem' }} // Smaller font size
                >
                  Search
                </button>
              </form>

              {/* Conditional Rendering Based on Authentication State */}
              <ul className="navbar-nav">
                {isAuthenticated ? (
                  // Show user info and "Disconnect" button if authenticated
                  <div className="d-flex align-items-center">
                    <img
                      src={user?.photoURL}
                      alt="Profile"
                      style={{ width: "25px", borderRadius: "50%", marginRight: "5px" }} // Smaller size and margin
                    />
                    <span className="text-light me-1" style={{ fontSize: '0.8rem' }}>{user?.displayName}</span> {/* Smaller font size */}
                    <button
                      onClick={logout}
                      className="btn btn-danger p-0 border-0" // Reduced padding
                      style={{ fontSize: '0.8rem' }} // Smaller font size
                    >
                      Disconnect
                    </button>
                  </div>
                ) : (
                  // Show "Login" and "Register" buttons if not authenticated
                  <div className="d-flex align-items-center">
                    <Link
                      to="/login"
                      className="btn btn-outline-primary me-1 p-0 border-0" // Reduced padding and margin
                      style={{ fontSize: '0.8rem' }} // Smaller font size
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="btn btn-primary p-0 border-0" // Reduced padding
                      style={{ fontSize: '0.8rem' }} // Smaller font size
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

// updated
// // src/components/NavBar.js
// import React from 'react';
// import { Link } from 'react-router-dom';
// import './NavBar.css'; // Custom CSS for the logo
// import { useAuth } from '../auth/AuthContext';

// const NavBar = () => {
//   const { isAuthenticated, logout, user } = useAuth(); // Get authentication state, logout function, and user data

//   return (
//     <div>
//       <header>
//         {/* Navbar */}
//         <nav
//           className="navbar navbar-expand-lg navbar-dark bg-dark shadow"
//           style={{ zIndex: 2000 }}
//         >
//           <div className="container">
//             {/* Logo */}
//             <Link className="navbar-brand" to="/">
//               <div className="logo">
//                 <span className="logo-highlight animated-logo">Get</span>
//                 <span className="bg-danger animated-logo">House</span>
//               </div>
//               <style jsx>{`
//                 .logo {
//                   font-size: 2.5rem;
//                   font-weight: bold;
//                   display: inline-block;
//                   cursor: pointer;
//                 }
//                 .logo-highlight {
//                   color: #007bff; /* Blue color for "Get" */
//                 }
//                 .bg-danger {
//                   color: white; /* White text for "House" */
//                   padding: 0 5px;
//                   border-radius: 5px;
//                 }
//                 .animated-logo {
//                   display: inline-block;
//                   opacity: 0;
//                   animation: fadeIn 1.5s forwards;
//                 }
//                 .animated-logo:nth-child(1) {
//                   animation-delay: 0.5s;
//                 }
//                 .animated-logo:nth-child(2) {
//                   animation-delay: 1s;
//                 }
//                 @keyframes fadeIn {
//                   to {
//                     opacity: 1;
//                   }
//                 }
//                 .logo:hover .logo-highlight {
//                   color: #0056b3; /* Darker blue on hover */
//                   transition: color 0.3s ease;
//                 }
//                 .logo:hover .bg-danger {
//                   background-color: #dc3545; /* Brighter red on hover */
//                   transition: background-color 0.3s ease;
//                 }
//               `}</style>
//             </Link>

//             {/* Navbar Toggler */}
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

//             {/* Navbar Links */}
//             <div className="collapse navbar-collapse" id="navbarNav">
//               <ul className="navbar-nav me-auto">
//                 <li className="nav-item">
//                   <Link className="nav-link active" to="/">
//                     Home
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link className="nav-link active" to="/properties">
//                     Properties
//                   </Link>
//                 </li>
//                 <li className="nav-item dropdown">
//                   <Link
//                     className="nav-link dropdown-toggle"
//                     to="#"
//                     id="navbarDropdown"
//                     role="button"
//                     data-bs-toggle="dropdown"
//                     aria-expanded="false"
//                   >
//                     More!
//                   </Link>
//                   <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
//                     <li>
//                       <Link className="dropdown-item" to="/about">
//                         About Us
//                       </Link>
//                     </li>
//                     <li>
//                       <Link className="dropdown-item" to="/contact">
//                         Contact Us
//                       </Link>
//                     </li>
//                     <li>
//                       <Link className="dropdown-item" to="/privacy">
//                         Privacy Policy
//                       </Link>
//                     </li>
//                   </ul>
//                 </li>
//               </ul>

//               {/* Search Form */}
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

//               {/* Conditional Rendering Based on Authentication State */}
//               <ul className="navbar-nav">
//                 {isAuthenticated ? (
//                   // Show user info and "Disconnect" button if authenticated
//                   <div className="d-flex align-items-center">
//                     <img
//                       src={user?.photoURL}
//                       alt="Profile"
//                       style={{ width: "40px", borderRadius: "50%", marginRight: "10px" }}
//                     />
//                     <span className="text-light me-3">{user?.displayName}</span>
//                     <button onClick={logout} className="btn btn-danger">
//                       Disconnect
//                     </button>
//                   </div>
//                 ) : (
//                   // Show "Login" and "Register" buttons if not authenticated
//                   <div className="d-flex align-items-center">
//                     <Link to="/login" className="btn btn-outline-primary me-2">
//                       Login
//                     </Link>
//                     <Link to="/register" className="btn btn-primary">
//                       Register
//                     </Link>
//                   </div>
//                 )}
//               </ul>
//             </div>
//           </div>
//         </nav>
//       </header>
//     </div>
//   );
// };

// export default NavBar;

