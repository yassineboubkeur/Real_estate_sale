import { useState } from "react";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // Handle form submission logic here (e.g., API call)
    console.log("Form Submitted", formData);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Register</h2>
      {/* Welcome Section */}
      <div className="mb-4 text-center">
        <p>
          If you already have an account, please log in to access your account.
        </p>
        <p>
          If you have an account,{" "}
          <a href="/login" className="text-primary font-bold">
            Sign in here
          </a>
          .
        </p>
      </div>

      <form className="w-50 mx-auto" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
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
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="form-control"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="form-control"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <textarea
            id="address"
            name="address"
            className="form-control"
            placeholder="Enter your address"
            value={formData.address}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Gender</label>
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
              <label className="form-check-label" htmlFor="genderMale">
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
              <label className="form-check-label" htmlFor="genderFemale">
                Female
              </label>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>
      </form>
      {/* Social Login Options */}
      <div className="mt-4 text-center flex flex-col justify-between h-40">
        <p>Or register with</p>
        <button className="btn btn-danger w-3/4 mx-auto mb-2">
          Register with Google
        </button>
        <br />
        <button className="btn btn-primary w-3/4 mx-auto">
          Register with Facebook
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

export default RegisterPage;
