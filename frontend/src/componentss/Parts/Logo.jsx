import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap CSS is imported

const Logo = () => {
  return (
    <div className="logo">
      <span className="logo-highlight animated-logo">Get</span>
      <span className="bg-danger animated-logo">House</span>

      {/* Add custom styles */}
      <style jsx>{`
        .logo {
          font-size: 2.5rem;
          font-weight: bold;
          display: inline-block;
          cursor: pointer;
        }
        .logo-highlight {
          color: #007bff; /* Blue color for "Get" */
        }
        .bg-danger {
          color: white; /* White text for "House" */
          padding: 0 5px;
          border-radius: 5px;
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
    </div>
  );
};

export default Logo;