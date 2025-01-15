import buildingImage from "../assets/images/image buildingblu.jpg";
import buildingImage2 from "../assets/images/bg1.png";
import AutoCarouselWithCards from "./views/Carousel";

const HomePage = () => {
  return (
    <div>
      {/* Banner */}
      <div
        id="intro"
        className="bg-image shadow-2-strong"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${buildingImage})`, // Gradient overlay
          height: "50vh",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "relative",
        }}
      >
        <div
          className="mask d-flex align-items-center justify-content-center text-center text-white"
          style={{
            height: "100%",
            padding: "0 5px",
          }}
        >
          <div className="container">
            <h1 className="mb-1 display-5 fw-bold" style={{ fontSize: "2rem", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}> {/* Text shadow for better readability */}
              Real Estate Sale
            </h1>
            <p className="mb-2 lead" style={{ fontSize: "0.9rem", textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)" }}> {/* Text shadow for better readability */}
              Discover the best properties for sale
            </p>
            <div>
              <a className="btn btn-outline-light btn-sm" href="#properties" style={{ fontSize: "0.9rem" }}> {/* Smaller button */}
                View Properties
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel Section */}
      <AutoCarouselWithCards />

      {/* Search Section */}
      <section className="py-3" style={{ backgroundColor: "#f8f9fa" }}> {/* Light background */}
        <div
          className="container p-3 text-center"
          style={{
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(245, 245, 245, 0.95))", // Subtle gradient
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow
          }}
        >
          <h2 className="mb-3 fw-bold" style={{ fontSize: "1.5rem", color: "#343a40" }}> {/* Darker text for contrast */}
            Find Your Dream Property
          </h2>
          <div className="row">
            <div className="col-md-4 mb-2">
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Location"
                style={{ border: "1px solid #ced4da", borderRadius: "5px" }} // Styled input
              />
            </div>
            <div className="col-md-4 mb-2">
              <select
                className="form-control form-control-sm"
                style={{ border: "1px solid #ced4da", borderRadius: "5px" }} // Styled select
              >
                <option>All Property Types</option>
                <option>House</option>
                <option>Apartment</option>
                <option>Villa</option>
              </select>
            </div>
            <div className="col-md-4 mb-2">
              <input
                type="number"
                className="form-control form-control-sm"
                placeholder="Max Price"
                style={{ border: "1px solid #ced4da", borderRadius: "5px" }} // Styled input
              />
            </div>
          </div>
          <button className="btn btn-primary btn-sm" style={{ fontSize: "0.9rem" }}> {/* Smaller button */}
            Search
          </button>
        </div>
      </section>

      {/* Recently Added Properties */}
      <section
        id="recently-added"
        className="container p-3 my-3"
        style={{
          background: "linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(245, 245, 245, 0.95))", // Subtle gradient
          borderRadius: "10px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow
        }}
      >
        <h2 className="text-center fw-bold mb-3" style={{ fontSize: "1.5rem", color: "#343a40" }}> {/* Darker text for contrast */}
          Recently Added Properties
        </h2>
        <div className="row">
          <div className="col-md-4 mb-3">
            <div className="card h-100 shadow-sm border-0">
              <img
                src="https://via.placeholder.com/300x200"
                className="card-img-top"
                alt="Property 1"
                style={{ height: "150px", objectFit: "cover" }} // Reduced image height
              />
              <div className="card-body p-2">
                <h5 className="card-title font-weight-bold" style={{ fontSize: "1rem", color: "#343a40" }}> {/* Darker text for contrast */}
                  Cozy Apartment in the City
                </h5>
                <p className="card-text text-muted small">2 Bedrooms, 2 Bathrooms, 1000 sqft</p> {/* Smaller text */}
                <p className="card-text h6 text-primary font-weight-bold"> {/* Smaller font size */}
                  $350,000
                </p>
                <button className="btn btn-primary btn-sm btn-block"> {/* Smaller button */}
                  View Details
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card h-100 shadow-sm border-0">
              <img
                src="https://via.placeholder.com/300x200"
                className="card-img-top"
                alt="Property 2"
                style={{ height: "150px", objectFit: "cover" }} // Reduced image height
              />
              <div className="card-body p-2">
                <h5 className="card-title font-weight-bold" style={{ fontSize: "1rem", color: "#343a40" }}> {/* Darker text for contrast */}
                  Spacious Family Home
                </h5>
                <p className="card-text text-muted small">3 Bedrooms, 2 Bathrooms, 2000 sqft</p> {/* Smaller text */}
                <p className="card-text h6 text-primary font-weight-bold"> {/* Smaller font size */}
                  $550,000
                </p>
                <button className="btn btn-primary btn-sm btn-block"> {/* Smaller button */}
                  View Details
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card h-100 shadow-sm border-0">
              <img
                src="https://via.placeholder.com/300x200"
                className="card-img-top"
                alt="Property 3"
                style={{ height: "150px", objectFit: "cover" }} // Reduced image height
              />
              <div className="card-body p-2">
                <h5 className="card-title font-weight-bold" style={{ fontSize: "1rem", color: "#343a40" }}> {/* Darker text for contrast */}
                  Luxury Waterfront Villa
                </h5>
                <p className="card-text text-muted small">5 Bedrooms, 6 Bathrooms, 5000 sqft</p> {/* Smaller text */}
                <p className="card-text h6 text-primary font-weight-bold"> {/* Smaller font size */}
                  $2,000,000
                </p>
                <button className="btn btn-primary btn-sm btn-block"> {/* Smaller button */}
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section
        className="container p-3 my-3"
        style={{
          background: "linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(245, 245, 245, 0.95))", // Subtle gradient
          borderRadius: "10px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow
        }}
      >
        <h2 className="text-center fw-bold mb-3" style={{ fontSize: "1.5rem", color: "#343a40" }}> {/* Darker text for contrast */}
          Explore Properties on the Map
        </h2>
        <div id="map" style={{ height: "250px", backgroundColor: "#f1f1f1", borderRadius: "8px" }}> {/* Rounded corners */}
          {/* Here you can integrate a map service like Google Maps or Mapbox */}
          <p className="text-center text-md">Interactive Map goes here.</p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;