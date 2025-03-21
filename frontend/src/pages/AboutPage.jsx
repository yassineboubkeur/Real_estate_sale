

const AboutPage = () => {
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">About Us</h2>
      <div className="row">
        <div className="col-md-6">
          <h3>Our Story</h3>
          <p>
            We are a team of passionate individuals committed to providing
            the best services and products to our customers. Our journey
            started in [year], and we have since grown to become leaders in
            the industry. We aim to create meaningful experiences through
            innovation and dedication.
          </p>
        </div>
        <div className="col-md-6">
          <h3>Our Mission</h3>
          <p>
            Our mission is to deliver high-quality products that exceed
            customer expectations. We are committed to continuous
            improvement and making a positive impact on the lives of our
            customers.
          </p>
        </div>
      </div>

      <div className="mt-5">
        <h3 className="text-center mb-4">Our Team</h3>
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <img
                src="https://via.placeholder.com/150"
                className="card-img-top"
                alt="Team Member 1"
              />
              <div className="card-body">
                <h5 className="card-title">John Doe</h5>
                <p className="card-text">CEO & Founder</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <img
                src="https://via.placeholder.com/150"
                className="card-img-top"
                alt="Team Member 2"
              />
              <div className="card-body">
                <h5 className="card-title">Jane Smith</h5>
                <p className="card-text">COO</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <img
                src="https://via.placeholder.com/150"
                className="card-img-top"
                alt="Team Member 3"
              />
              <div className="card-body">
                <h5 className="card-title">Samuel Green</h5>
                <p className="card-text">CTO</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <h3 className="text-center mb-4">Why Choose Us?</h3>
        <p>
          We are dedicated to providing the highest level of customer
          satisfaction. With our years of experience, professional team, and
          commitment to quality, we ensure that our products and services will
          meet your needs and exceed your expectations. Whether you're looking
          for innovation, reliability, or efficiency, we are here to deliver.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
