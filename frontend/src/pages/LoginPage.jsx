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
    <div className="min-vh-100 d-flex align-items-center py-5 justify-content-center bg-light">
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
              className="form-control border border-2 rounded"
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
              className="form-control border border-2 rounded"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Forgotten Password Link */}
          <div className="mb-3 text-end">
            <a href="/forgot-password" className="text-decoration-none">
              Forgot your password?
            </a>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-100 mb-3">
            Login
          </button>
        </form>

        {/* Social Login Options */}
        <div className="text-center mt-4">
          <p className="text-muted mb-3">Or login with</p>
          <div className="d-grid gap-2">
            <button className="btn btn-danger">
              <i className="bi bi-google me-2"></i>Login with Google
            </button>
            <button className="btn btn-primary">
              <i className="bi bi-facebook me-2"></i>Login with Facebook
            </button>
          </div>
        </div>

        {/* Sign Up Link */}
        <div className="text-center mt-4">
          <p className="text-muted">
            Don't have an account?{" "}
            <a href="/register" className="text-decoration-none">
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

// import { useState } from "react";

// const LoginPage = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission logic here (e.g., API call)
//     console.log("Form Submitted", formData);
//   };

//   return (
//     <div className="container mt-5">
//       <h2 className="text-center mb-4">Login</h2>

//       {/* Welcome Section */}
//       <div className="mb-4 text-center">
//         <p>Welcome back! Please log in to access your account.</p>
//         <p>
//           If you don't have an account, <a href="/register">sign up here</a>.
//         </p>
//       </div>

//       {/* Login Form */}
//       <form className="w-50 mx-auto" onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label htmlFor="email" className="form-label">
//             Email
//           </label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             className="form-control"
//             placeholder="Enter your email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="password" className="form-label">
//             Password
//           </label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             className="form-control"
//             placeholder="Enter your password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* Forgotten Password Link */}
//         <div className="mb-3 text-end">
//           <a href="/forgot-password">Forgot your password?</a>
//         </div>

//         {/* Submit Button */}
//         <button type="submit" className="btn btn-primary w-100">
//           Login
//         </button>
//       </form>

//       {/* Social Login Options */}
//       <div className="mt-4 text-center flex flex-col justify-between h-40">
//         <p>Or login with</p>
//         <button className="btn btn-danger w-3/4 mx-auto mb-2">
//           Login with Google
//         </button>
//         <br />
//         <button className="btn btn-primary w-3/4 mx-auto">
//           Login with Facebook
//         </button>
//       </div>

//       {/* Security Notice */}
//       <div className="mt-4 text-center">
//         <p className="text-muted">
//           Your data is securely stored. We respect your privacy.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
