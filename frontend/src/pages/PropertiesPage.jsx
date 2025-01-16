import { useState } from "react";

const propertiesData = [
  {
    id: 1,
    title: "Beautiful House in the Suburbs",
    description: "A spacious 3-bedroom house with a garden and modern amenities.",
    price: "$300,000",
    imageUrl: "https://via.placeholder.com/300x200",
  },
  {
    id: 2,
    title: "Luxury Apartment Downtown",
    description: "A luxury 2-bedroom apartment in the heart of the city.",
    price: "$450,000",
    imageUrl: "https://via.placeholder.com/300x200",
  },
  {
    id: 3,
    title: "Cozy Cottage by the Beach",
    description: "A charming 1-bedroom cottage with a breathtaking view of the ocean.",
    price: "$200,000",
    imageUrl: "https://via.placeholder.com/300x200",
  },
];

// Reusable Property Card Component
const PropertyCard = ({ property }) => (
  <div className="col-md-4 mb-3" key={property.id}> {/* Reduced margin-bottom */}
    <div className="card h-100 shadow-sm border-0">
      <img
        src={property.imageUrl}
        className="card-img-top"
        alt={`${property.title}`}
        style={{ height: "150px", objectFit: "cover" }} // Reduced image height
      />
      <div className="card-body p-2"> {/* Reduced padding */}
        <h5 className="card-title font-weight-bold" style={{ fontSize: "1rem" }}> {/* Smaller font size */}
          {property.title}
        </h5>
        <p className="card-text text-muted small">{property.description}</p> {/* Smaller text */}
        <p className="card-text h6 text-primary font-weight-bold"> {/* Smaller font size */}
          {property.price}
        </p>
        <button className="btn btn-primary btn-sm btn-block" aria-label={`View details for ${property.title}`}> {/* Smaller button */}
          View Details
        </button>
      </div>
    </div>
  </div>
);

const PropertiesPage = () => {
  const [filteredProperties, setFilteredProperties] = useState(propertiesData);
  const [searchQuery, setSearchQuery] = useState("");

  const handleFilter = () => {
    const filterValue = searchQuery.trim().toLowerCase();
    setFilteredProperties(
      propertiesData.filter((property) =>
        property.title.toLowerCase().includes(filterValue)
      )
    );
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleFilter();
    }
  };

  return (
    <div className="container mt-3"> {/* Reduced margin-top */}
      <h2 className="text-center mb-3 h3 font-weight-bold"> {/* Smaller font size */}
        Explore Our Properties
      </h2>
      <p className="text-center text-muted mb-3 small"> {/* Smaller text */}
        Discover your dream home from our curated collection of properties.
      </p>

      {/* Search Bar with Button */}
      <div className="mb-3"> {/* Reduced margin-bottom */}
        <div className="input-group" style={{ width: "250px" }}> {/* Smaller width */}
          <input
            type="text"
            className="form-control form-control-sm border border-2 rounded-start focus:border-primary focus:shadow-sm transition" // Smaller input
            placeholder="Search properties..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            aria-label="Search properties"
            style={{ transition: "border-color 0.3s ease, box-shadow 0.3s ease" }}
          />
          <button
            className="btn btn-primary btn-sm border border-2 rounded-end hover:bg-dark-primary transition" // Smaller button
            type="button"
            onClick={handleFilter}
            style={{ transition: "background-color 0.3s ease" }}
          >
            Search
          </button>
        </div>
      </div>

      {/* Property Cards */}
      <div className="row">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))
        ) : (
          <p className="text-center text-muted w-100 small"> {/* Smaller text */}
            No properties match your search.
          </p>
        )}
      </div>

      {/* Call-to-Action Section */}
      <div className="text-center mt-3"> {/* Reduced margin-top */}
        <h3 className="h5 font-weight-bold">Can't Find What You're Looking For?</h3> {/* Smaller font size */}
        <p className="text-muted mb-2 small"> {/* Smaller text */}
          Contact us for personalized assistance in finding your dream property.
        </p>
        <a href="/contact" className="btn btn-outline-primary btn-sm"> {/* Smaller button */}
          Contact Us
        </a>
      </div>
    </div>
  );
};

export default PropertiesPage;