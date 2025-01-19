import React from 'react';
import { Link } from 'react-router-dom';

const CheckEmailPage = () => {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow-lg p-4" style={{ width: "100%", maxWidth: "320px" }}>
        <h2 className="h3 font-weight-bold text-center">Check Your Email</h2>
        <p className="text-muted text-center">
          We've sent a password reset link to your email. Please check your inbox and follow the instructions to reset your password.
        </p>
        <div className="text-center mt-3">
          <Link to="/login" className="text-decoration-none text-primary">
            Go back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckEmailPage;
