import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "bootstrap/dist/css/bootstrap.min.css";

const AutoCarouselWithCards = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to handle "More" button click
  const handleMoreClick = (category) => {
    // Navigate to a new page or update state to filter properties
    navigate(`/properties?category=${category}`);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Featured Properties</h2>
      <div className="row">
        {/* Apartment Card */}
        <div className="col-md-4">
          <div className="card">
            <img
              src="https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              className="card-img-top"
              alt="Apartment"
            />
            <div className="card-body">
              <h5 className="card-title">Apartment</h5>
              <p className="card-text">
                Some quick example text about the apartment.
              </p>
              <button
                className="btn btn-primary"
                onClick={() => handleMoreClick("apartment")} // Pass category
              >
                More
              </button>
            </div>
          </div>
        </div>

        {/* House Card */}
        <div className="col-md-4">
          <div className="card">
            <img
              src="https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              className="card-img-top"
              alt="House"
            />
            <div className="card-body">
              <h5 className="card-title">House</h5>
              <p className="card-text">
                Some quick example text about the house.
              </p>
              <button
                className="btn btn-primary"
                onClick={() => handleMoreClick("house")} // Pass category
              >
                More
              </button>
            </div>
          </div>
        </div>

        {/* Villa Card */}
        <div className="col-md-4">
          <div className="card">
            <img
              src="https://images.pexels.com/photos/5997992/pexels-photo-5997992.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              className="card-img-top"
              alt="Villa"
            />
            <div className="card-body">
              <h5 className="card-title">Villa</h5>
              <p className="card-text">
                Some quick example text about the villa.
              </p>
              <button
                className="btn btn-primary"
                onClick={() => handleMoreClick("villa")} // Pass category
              >
                More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutoCarouselWithCards;