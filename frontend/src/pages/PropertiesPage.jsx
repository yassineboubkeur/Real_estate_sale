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
  <div className="col-md-4 mb-4" key={property.id}>
    <div className="card h-100 shadow-sm border-0">
      <img
        src={property.imageUrl}
        className="card-img-top"
        alt={`${property.title}`}
        style={{ height: "200px", objectFit: "cover" }}
      />
      <div className="card-body">
        <h5 className="card-title font-weight-bold">{property.title}</h5>
        <p className="card-text text-muted">{property.description}</p>
        <p className="card-text h5 text-primary font-weight-bold">
          {property.price}
        </p>
        <button className="btn btn-primary btn-block" aria-label={`View details for ${property.title}`}>
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
    <div className="container mt-5">
      <h2 className="text-center mb-4 display-4 font-weight-bold">
        Explore Our Properties
      </h2>
      <p className="text-center text-muted mb-5">
        Discover your dream home from our curated collection of properties.
      </p>

      {/* Search Bar with Button */}
      <div className="mb-5">
                <div className="input-group" style={{ width: "300px" }}>
            <input
              type="text"
              className="form-control form-control-lg border border-2 rounded-start focus:border-primary focus:shadow-sm transition"
              placeholder="Search properties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              aria-label="Search properties"
              style={{ transition: "border-color 0.3s ease, box-shadow 0.3s ease" }}
            />
            <button
              className="btn btn-primary btn-lg border border-2 rounded-end hover:bg-dark-primary transition"
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
          <p className="text-center text-muted w-100">
            No properties match your search.
          </p>
        )}
      </div>

      {/* Call-to-Action Section */}
      <div className="text-center mt-5">
        <h3 className="h4 font-weight-bold">Can't Find What You're Looking For?</h3>
        <p className="text-muted mb-4">
          Contact us for personalized assistance in finding your dream property.
        </p>
        <a href="/contact" className="btn btn-outline-primary btn-lg">
          Contact Us
        </a>
      </div>
    </div>
  );
};

export default PropertiesPage;