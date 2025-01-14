// import "../assets/images/image buildingblu.jpg"
import buildingImage from "../assets/images/image buildingblu.jpg";
import buildingImage2 from "../assets/images/bg1.png";
import buildingImage3 from "../assets/images/purple.png";
import AutoCarouselWithCards from "./views/Carousel";

// buildingImage3

const HomePage = () => {
  return (
    <div>
      
      {/* Banner */}
      <div
        id="intro"
        className="bg-image shadow-2-strong"
        style={{
          backgroundImage: `url(${buildingImage})`,
          height: "100vh",
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "relative",
        }}
      >
        <div
          className="mask d-flex align-items-center justify-content-center text-center text-white"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            height: "100%",
            padding: "0 20px",
          }}
        >
          <div className="container">
            <h1 className="mb-3 display-3 fw-bold" style={{ fontSize: "4rem" }}>
              Real Estate Sale
            </h1>
            <p className="mb-4 lead" style={{ fontSize: "1.25rem" }}>
              Discover the best properties for sale
            </p>
            <div>
              <a className="btn btn-outline-light btn-lg" href="#properties">
                View Properties
              </a>
            </div>
          </div>
        </div>
      </div>
      <AutoCarouselWithCards/>
      {/* Search Section */}
      <section
        className="bg-light py-5"
      
      >
        <div className="container bg-light  p-4  text-center"  
         style={{
            backgroundImage: `url(${buildingImage2})`,
            // height: "100vh",
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            borderRadius:"10px",
            // position: "relative",
          }}>
          <h2 className="mb-4  fw-bold">Find Your Dream Property</h2>
          <div className="row">
            <div className="col-md-4 mb-4">
              <input
                type="text"
                className="form-control"
                placeholder="Location"
              />
            </div>
            <div className="col-md-4 mb-4">
              <select className="form-control">
                <option>All Property Types</option>
                <option>House</option>
                <option>Apartment</option>
                <option>Villa</option>
              </select>
            </div>
            <div className="col-md-4 mb-4">
              <input
                type="number"
                className="form-control"
                placeholder="Max Price"
              />
            </div>
          </div>
          <button className="btn btn-primary">Search</button>
        </div>
      </section>

      {/* Recently Added Properties */}
      <section id="recently-added" className="container p-4 my-5"
      
      style={{
        backgroundImage: `url(${buildingImage2})`,
        // height: "100vh",
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        borderRadius:"10px",
        // position: "relative",
      }}
      
      >
        <h2 className="text-center fw-bold mb-4">Recently Added Properties</h2>
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card">
              <img
                src="https://via.placeholder.com/300x200"
                className="card-img-top"
                alt="Property 1"
              />
              <div className="card-body">
                <h5 className="card-title">Cozy Apartment in the City</h5>
                <p className="card-text">2 Bedrooms, 2 Bathrooms, 1000 sqft</p>
                <p className="card-text">
                  <strong>$350,000</strong>
                </p>
                <a href="#" className="btn btn-primary">
                  View Details
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card">
              <img
                src="https://via.placeholder.com/300x200"
                className="card-img-top"
                alt="Property 2"
              />
              <div className="card-body">
                <h5 className="card-title">Spacious Family Home</h5>
                <p className="card-text">3 Bedrooms, 2 Bathrooms, 2000 sqft</p>
                <p className="card-text">
                  <strong>$550,000</strong>
                </p>
                <a href="#" className="btn btn-primary">
                  View Details
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card">
              <img
                src="https://via.placeholder.com/300x200"
                className="card-img-top"
                alt="Property 3"
              />
              <div className="card-body">
                <h5 className="card-title">Luxury Waterfront Villa</h5>
                <p className="card-text">5 Bedrooms, 6 Bathrooms, 5000 sqft</p>
                <p className="card-text">
                  <strong>$2,000,000</strong>
                </p>
                <a href="#" className="btn btn-primary">
                  View Details
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="container p-4 my-5"
      
      style={{
        backgroundImage: `url(${buildingImage2})`,
        // height: "100vh",
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        borderRadius:"10px",
        // position: "relative",
      }}
      >
        <h2 className="text-center fw-bold mb-4">Explore Properties on the Map</h2>
        <div id="map" style={{ height: "400px", backgroundColor: "#f1f1f1" }}>
          {/* Here you can integrate a map service like Google Maps or Mapbox */}
          <p className="text-center text-md">Interactive Map goes here.</p>
        </div>
      </section>

      {/* Advantages Section */}
   
    </div>
  );
};

export default HomePage;
