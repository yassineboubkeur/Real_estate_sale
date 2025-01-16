import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext'; // Import useAuth
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
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
        toast.success("Login successful!", {
          position: "bottom-right",
          autoClose: 4000, // Close after 4 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          style: {
            backgroundColor: "whitesmocke", // Green background color
            color: "purple", // White text color
            fontWeight:"bold"
          },
        }); // Toast for success
        login(); // Update authentication state
        console.log(data);

        // Save user data in localStorage
        localStorage.setItem('userr', JSON.stringify({
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          phone: data.user.phone,
          address: data.user.address,
          gender: data.user.gender,
        }));

        navigate("/"); // Redirect to the home page
      } else {
        toast.error(data.message || "An error occurred. Please try again.", {
          position: "bottom-right",
          autoClose: 4000, // Close after 3 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          style: {
            backgroundColor: "whitesmocke", // Green background color
            color: "blue", // White text color
            fontWeight:"bold"
          },
        }); // Toast for error
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Unable to connect to the server. Please try again later.", {
        position: "bottom-right",
        autoClose: 4000, // Close after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
          backgroundColor: "whitesmocke", // Green background color
          color: "blue", // White text color
          fontWeight:"bold"
        },
      }); // Toast for error
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow-lg p-2" style={{ width: "100%", maxWidth: "320px" }}>
        {/* Welcome Section */}
        <div className="text-center ">
          <h2 className="h3 font-weight-bold">Welcome Back</h2>
          <p className="text-muted">
            Please log in to access your account.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div className="">
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
              style={{ color: 'purple', fontWeight: 'bold' }} // Purple and bold text
            />
          </div>
          <div className="">
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
              style={{ color: 'purple', fontWeight: 'bold' }} // Purple and bold text
            />
          </div>

          {/* Forgotten Password Link */}
          <div className=" text-end">
            <Link to="/recover-password" className="text-decoration-none text-primary">
              Forgot your password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-100  rounded-pill"
            style={{ padding: "8px", fontSize: "1rem" }} // Smaller button
          >
            Login
          </button>
        </form>

        {/* Social Login Options */}
        <div className="text-center ">
          <p className="text-muted ">Or login with</p>
          
        </div>

        {/* Sign Up Link */}
        <div className="text-center ">
          <p className="text-muted">
            Don't have an account?{" "}
            <a href="/register" className="text-decoration-none text-primary">
              Sign up here
            </a>
          </p>
        </div>

        {/* Security Notice */}
       
      </div>
    </div>
  );
};

export default LoginPage;