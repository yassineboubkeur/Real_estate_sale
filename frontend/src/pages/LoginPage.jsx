


import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext'; // Import useAuth
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import GoogleSignIn from './GoogleSignIn';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login } = useAuth(); // Get the login function from AuthContext
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login successful!");
        login(); // Update authentication state
        localStorage.setItem('user', JSON.stringify(data.user)); // Store user data
        navigate("/"); // Redirect to the home page
      } else {
        alert(data.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Unable to connect to the server. Please try again later.");
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow-lg p-4" style={{ width: "100%", maxWidth: "400px" }}>
        {/* Welcome Section */}
        <div className="text-center mb-4">
          <h2 className="h3 font-weight-bold">Welcome Back</h2>
          <p className="text-muted">
            Please log in to access your account.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control border border-2 rounded-pill"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control border border-2 rounded-pill"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Forgotten Password Link */}
          <div className="mb-3 text-end">
            <a href="/forgot-password" className="text-decoration-none text-primary">
              Forgot your password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-100 mb-3 rounded-pill"
            style={{ padding: "10px", fontSize: "1.1rem" }}
          >
            Login
          </button>
        </form>

        {/* Social Login Options */}
        <div className="text-center mt-4">
          <p className="text-muted mb-3">Or login with</p>
          <div className="d-grid gap-2">
            <button
              className="btn btn-danger d-flex align-items-center justify-content-center rounded-pill"
              style={{ padding: "10px", fontSize: "1.1rem" }}
            >
              <i className="bi bi-google me-2"></i>
              <GoogleSignIn />
            </button>
            <button
              className="btn btn-primary d-flex align-items-center justify-content-center rounded-pill"
              style={{ padding: "10px", fontSize: "1.1rem" }}
            >
              <i className="bi bi-facebook me-2"></i>
              Login with Facebook
            </button>
          </div>
        </div>

        {/* Sign Up Link */}
        <div className="text-center mt-4">
          <p className="text-muted">
            Don't have an account?{" "}
            <a href="/register" className="text-decoration-none text-primary">
              Sign up here
            </a>
          </p>
        </div>

        {/* Security Notice */}
        <div className="text-center mt-4">
          <p className="text-muted small">
            Your data is securely stored. We respect your privacy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;