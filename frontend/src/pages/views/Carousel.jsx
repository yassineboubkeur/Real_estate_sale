import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const AutoCarouselWithCards = () => {
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Featured Properties</h2>
      <div
        id="carouselExampleAutoplaying"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          {/* Slide 1 */}
          <div className="carousel-item active" data-bs-interval="2000">
            <div className="row">
              {/* Card 1 */}
              <div className="col-md-4">
                <div className="card">
                  <img
                    src="https://via.placeholder.com/300"
                    className="card-img-top"
                    alt="Property 1"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Property 1</h5>
                    <p className="card-text">
                      Some quick example text about Property 1.
                    </p>
                    <a href="#" className="btn btn-primary">
                      View Details
                    </a>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="col-md-4">
                <div className="card">
                  <img
                    src="https://via.placeholder.com/300"
                    className="card-img-top"
                    alt="Property 2"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Property 2</h5>
                    <p className="card-text">
                      Some quick example text about Property 2.
                    </p>
                    <a href="#" className="btn btn-primary">
                      View Details
                    </a>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="col-md-4">
                <div className="card">
                  <img
                    src="https://via.placeholder.com/300"
                    className="card-img-top"
                    alt="Property 3"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Property 3</h5>
                    <p className="card-text">
                      Some quick example text about Property 3.
                    </p>
                    <a href="#" className="btn btn-primary">
                      View Details
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Slide 2 */}
          <div className="carousel-item" data-bs-interval="3000">
            <div className="row">
              {/* Card 4 */}
              <div className="col-md-4">
                <div className="card">
                  <img
                    src="https://via.placeholder.com/300"
                    className="card-img-top"
                    alt="Property 4"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Property 4</h5>
                    <p className="card-text">
                      Some quick example text about Property 4.
                    </p>
                    <a href="#" className="btn btn-primary">
                      View Details
                    </a>
                  </div>
                </div>
              </div>

              {/* Card 5 */}
              <div className="col-md-4">
                <div className="card">
                  <img
                    src="https://via.placeholder.com/300"
                    className="card-img-top"
                    alt="Property 5"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Property 5</h5>
                    <p className="card-text">
                      Some quick example text about Property 5.
                    </p>
                    <a href="#" className="btn btn-primary">
                      View Details
                    </a>
                  </div>
                </div>
              </div>

              {/* Card 6 */}
              <div className="col-md-4">
                <div className="card">
                  <img
                    src="https://via.placeholder.com/300"
                    className="card-img-top"
                    alt="Property 6"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Property 6</h5>
                    <p className="card-text">
                      Some quick example text about Property 6.
                    </p>
                    <a href="#" className="btn btn-primary">
                      View Details
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default AutoCarouselWithCards;