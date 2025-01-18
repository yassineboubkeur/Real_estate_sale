import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RecoverPasswordPage = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/users/recover-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Password reset link sent to your email!", {
          position: "bottom-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          style: {
            backgroundColor: "whitesmoke",
            color: "purple",
            fontWeight: "bold",
          },
        });

        
        navigate("/check-email");
      } else {
        toast.error(data.message || "An error occurred. Please try again.", {
          position: "bottom-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          style: {
            backgroundColor: "whitesmoke",
            color: "blue",
            fontWeight: "bold",
          },
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Unable to connect to the server. Please try again later.", {
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
          backgroundColor: "whitesmoke",
          color: "blue",
          fontWeight: "bold",
        },
      });
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow-lg p-4" style={{ width: "100%", maxWidth: "320px" }}>
        <div className="text-center">
          <h2 className="h3 font-weight-bold">Recover Password</h2>
          <p className="text-muted">
            Enter your email to receive a password reset link.
          </p>
        </div>

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
              value={email}
              onChange={handleChange}
              required
              style={{ color: 'purple', fontWeight: 'bold' }}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 rounded-pill"
            style={{ padding: "8px", fontSize: "1rem" }}
          >
            Send Reset Link
          </button>
        </form>

        <div className="text-center mt-3">
          <p className="text-muted">
            Remember your password?{" "}
            <a href="/login" className="text-decoration-none text-primary">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecoverPasswordPage;
