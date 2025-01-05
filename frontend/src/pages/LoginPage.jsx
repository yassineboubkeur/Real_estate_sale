import { useState } from "react";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., API call)
    console.log("Form Submitted", formData);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Login</h2>

      {/* Welcome Section */}
      <div className="mb-4 text-center">
        <p>Welcome back! Please log in to access your account.</p>
        <p>
          If you don't have an account, <a href="/register">sign up here</a>.
        </p>
      </div>

      {/* Login Form */}
      <form className="w-50 mx-auto" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
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
            className="form-control"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Forgotten Password Link */}
        <div className="mb-3 text-end">
          <a href="/forgot-password">Forgot your password?</a>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>

      {/* Social Login Options */}
      <div className="mt-4 text-center flex flex-col justify-between h-40">
        <p>Or login with</p>
        <button className="btn btn-danger w-3/4 mx-auto mb-2">
          Login with Google
        </button>
        <br />
        <button className="btn btn-primary w-3/4 mx-auto">
          Login with Facebook
        </button>
      </div>

      {/* Security Notice */}
      <div className="mt-4 text-center">
        <p className="text-muted">
          Your data is securely stored. We respect your privacy.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
