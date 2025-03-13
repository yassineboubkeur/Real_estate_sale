import { useState } from 'react';

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    phone: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          phone: '',
        });
        setError('');
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to submit form');
      }
    } catch (error) {
      setError('Error submitting form. Please try again.');
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Contact Us</h2>

      {/* Confirmation Message */}
      {submitted && (
        <div className="alert alert-success text-center" role="alert">
          Your message has been sent successfully! We'll get back to you soon.
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="alert alert-danger text-center" role="alert">
          {error}
        </div>
      )}

      <form className="w-50 mx-auto" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control custom-input"
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
            className="form-control custom-input"
            placeholder="Enter your email"
            value={formData.email}
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
            className="form-control custom-input"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="subject" className="form-label">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            className="form-control custom-input"
            placeholder="Enter the subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="message" className="form-label">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            className="form-control custom-input"
            placeholder="Enter your message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Send Message
        </button>
      </form>

      <div className="mt-5 text-center">
        <h4>Our Location</h4>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3131.724658767197!2d-122.40207408468127!3d37.78442077975731!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858091d5ec50c5%3A0x99f313fe5fa9db08!2sGoogleplex!5e0!3m2!1sen!2sus!4v1617119256360!5m2!1sen!2sus"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>

      <div className="mt-5 text-center">
        <h4>Contact Information</h4>
        <p>Email: contact@myapp.com</p>
        <p>Phone: +123 456 7890</p>
        <p>Address: 1234 Street Name, City, Country</p>
      </div>

      {/* Add custom styles */}
      <style jsx>{`
        .custom-input {
          border: 2px solid #ced4da;
          border-radius: 8px;
          padding: 10px;
          transition: border-color 0.3s ease;
        }
        .custom-input:focus {
          border-color: #80bdff;
          outline: none;
          box-shadow: 0 0 5px rgba(128, 189, 255, 0.5);
        }
        .btn-primary {
          background-color: #007bff;
          border: none;
          border-radius: 8px;
          padding: 10px;
          font-size: 16px;
          transition: background-color 0.3s ease;
        }
        .btn-primary:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
};

export default ContactUsPage;