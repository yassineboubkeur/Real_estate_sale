import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import buildingImage from "../assets/images/image buildingblu.jpg";
import AutoCarouselWithCards from "./views/Carousel";

const HomePage = () => {
  const [recentProperties, setRecentProperties] = useState([]);

  // Fetch recently added properties from the backend
  useEffect(() => {
    const fetchRecentProperties = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/properties/recent",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch recent properties");
        }

        const data = await response.json();
        setRecentProperties(data.properties); // Set the fetched properties
      } catch (error) {
        console.error("Error fetching recent properties:", error);
      }
    };

    fetchRecentProperties();
  }, []);

  return (
    <div>
      {/* Banner */}
      <div
        id="intro"
        className="bg-image shadow-2-strong"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${buildingImage})`,
          height: "80vh",
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
            <h1
              className="mb-1 display-5 fw-bold"
              style={{
                fontSize: "2rem",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
              }}
            >
              Real Estate Sale
            </h1>
            <p
              className="mb-2 lead"
              style={{
                fontSize: "0.9rem",
                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
              }}
            >
              Discover the best properties for sale
            </p>
            <div>
              <a
                className="btn btn-outline-light btn-sm"
                href="#properties"
                style={{ fontSize: "0.9rem" }}
              >
                View Properties
              </a>
              <Link
                className="btn btn-outline-light btn-sm ml-2"
                to="/add-property"
                style={{ fontSize: "0.9rem" }}
              >
                Add new property
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel Section */}
       {/* Search Section */}
       <section className="py-3" >
        <div
          className="container p-3 text-center"
          style={{
            background:
              "linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(245, 245, 245, 0.95))",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h2
            className="mb-3 fw-bold"
            style={{ fontSize: "1.5rem", color: "#343a40" }}
          >
            Find Your Dream Property
          </h2>
          <div className="row gap-4">
            <div className="col-md-4 mb-2">
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Location"
                style={{ border: "1px solid #ced4da", borderRadius: "5px" }}
              />
            </div>
            <div className="col-md-4 mb-2">
              <select
                className="form-control form-control-sm"
                style={{ border: "1px solid #ced4da", borderRadius: "5px" }}
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
                style={{ border: "1px solid #ced4da", borderRadius: "5px" }}
              />
            </div>
          </div>
          <button
            className="btn btn-primary btn-sm"
            style={{ fontSize: "0.9rem" }}
          >
            Search
          </button>
        </div>
      </section>

      <AutoCarouselWithCards />

     

      {/* Recently Added Properties */}
      <section
        id="recently-added"
        className="container p-3 my-3"
        style={{
          background:
            "linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(245, 245, 245, 0.95))",
          borderRadius: "10px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2
          className="text-center fw-bold mb-3"
          style={{ fontSize: "1.5rem", color: "#343a40" }}
        >
          Recently Added Properties
        </h2>
        <div className="row">
          {recentProperties.length > 0 ? (
            recentProperties.map((property) => (
              <div className="col-md-4 card2 mb-3" key={property.id}>
                <div className="card h-100 shadow-sm border-0">
                  <img
                    src={`http://localhost:3000/uploads/${property.picture}`}
                    className="card-img-top"
                    alt={property.title}
                    style={{ height: "150px", objectFit: "cover" }}
                  />
                  <div className="card-body p-2">
                    <h5
                      className="card-title font-weight-bold"
                      style={{ fontSize: "1rem", color: "#343a40" }}
                    >
                      {property.title}
                    </h5>
                    <p className="card-text text-muted small">
                      {property.description}
                    </p>
                    <p className="card-text h6 text-primary font-weight-bold">
                      ${property.price}
                    </p>
                    <Link
                      to={`/property-details/${property.id}`}
                      className="btn btn-primary btn-sm btn-block"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-muted w-100 small">
              No recently added properties.
            </p>
          )}
        </div>
      </section>

      {/* Interactive Map Section */}
      {/* <section
        className="container p-3 my-3"
        style={{
          background:
            "linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(245, 245, 245, 0.95))",
          borderRadius: "10px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2
          className="text-center fw-bold mb-3"
          style={{ fontSize: "1.5rem", color: "#343a40" }}
        >
          Explore Properties on the Map
        </h2>
        <div
          id="map"
          style={{
            height: "250px",
            backgroundColor: "#f1f1f1",
            borderRadius: "8px",
          }}
        >
          <p className="text-center text-md">Interactive Map goes here.</p>
        </div>
      </section> */}
    </div>
  );
};

export default HomePage;
