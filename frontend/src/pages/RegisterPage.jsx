import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    gender: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          address: formData.address,
          gender: formData.gender,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("User registered successfully!");
        console.log(data);

        // Redirect to the login page
        navigate("/login");
      } else {
        alert(data.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Unable to connect to the server. Please try again later.");
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light py-3">
      <div className="card shadow-lg p-3" style={{ width: "100%", maxWidth: "600px" }}>
        {/* Welcome Section */}
        <div className="text-center mb-3">
          <h2 className="h4 font-weight-bold">Create Your Account</h2>
          <p className="text-muted small">
            Join us today! Fill out the form to get started.
          </p>
        </div>

        {/* Register Form */}
        <form onSubmit={handleSubmit}>
          <div className="row">
            {/* Left Column */}
            <div className="col-md-6">
              {/* Name Field */}
              <div className="mb-2">
                <label htmlFor="name" className="form-label small">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control border border-2 rounded"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={{ fontSize: "0.9rem" }}
                />
              </div>

              {/* Email Field */}
              <div className="mb-2">
                <label htmlFor="email" className="form-label small">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control border border-2 rounded"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{ fontSize: "0.9rem" }}
                />
              </div>

              {/* Password Field */}
              <div className="mb-2">
                <label htmlFor="password" className="form-label small">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control border border-2 rounded"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  style={{ fontSize: "0.9rem" }}
                />
              </div>

              {/* Confirm Password Field */}
              <div className="mb-2">
                <label htmlFor="confirmPassword" className="form-label small">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="form-control border border-2 rounded"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  style={{ fontSize: "0.9rem" }}
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="col-md-6">
              {/* Phone Field */}
              <div className="mb-2">
                <label htmlFor="phone" className="form-label small">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="form-control border border-2 rounded"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  style={{ fontSize: "0.9rem" }}
                />
              </div>

              {/* Address Field */}
              <div className="mb-2">
                <label htmlFor="address" className="form-label small">
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  className="form-control border border-2 rounded"
                  placeholder="Enter your address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  style={{ fontSize: "0.9rem" }}
                ></textarea>
              </div>

              {/* Gender Field */}
              <div className="mb-2">
                <label className="form-label small">Gender</label>
                <div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      id="genderMale"
                      value="Male"
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label small" htmlFor="genderMale">
                      Male
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      id="genderFemale"
                      value="Female"
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label small" htmlFor="genderFemale">
                      Female
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-100 mb-2"
            style={{ fontSize: "0.9rem", padding: "6px" }}
          >
            Register
          </button>
        </form>

        {/* Social Login Options */}
        <div className="text-center mt-3">
          <p className="text-muted small mb-2">Or register with</p>
     
        </div>

        {/* Login Link */}
        <div className="text-center mt-3">
          <p className="text-muted small">
            Already have an account?{" "}
            <a href="/login" className="text-decoration-none">
              Sign in here
            </a>
          </p>
        </div>

        {/* Security Notice */}
       
      </div>
    </div>
  );
};

export default RegisterPage;