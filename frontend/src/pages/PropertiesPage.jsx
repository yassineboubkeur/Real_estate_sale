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

const PropertiesPage = () => {
  const [filteredProperties, setFilteredProperties] = useState(propertiesData);

  const handleFilter = (e) => {
    const filterValue = e.target.value.toLowerCase();
    const filtered = propertiesData.filter((property) =>
      property.title.toLowerCase().includes(filterValue)
    );
    setFilteredProperties(filtered);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 display-4 font-weight-bold">Explore Our Properties</h2>
      <p className="text-center text-muted mb-5">
        Discover your dream home from our curated collection of properties.
      </p>

      {/* Search Bar */}
      <div className="mb-5">
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Search properties..."
          onChange={handleFilter}
        />
      </div>

      {/* Property Cards */}
      <div className="row">
        {filteredProperties.map((property) => (
          <div className="col-md-4 mb-4" key={property.id}>
            <div className="card h-100 shadow-sm border-0">
              <div className="position-relative">
                <img
                  src={property.imageUrl}
                  className="card-img-top"
                  alt={property.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-25"></div>
              </div>
              <div className="card-body">
                <h5 className="card-title font-weight-bold">{property.title}</h5>
                <p className="card-text text-muted">{property.description}</p>
                <p className="card-text h5 text-primary font-weight-bold">
                  {property.price}
                </p>
                <a href="#" className="btn btn-primary btn-block">
                  View Details
                </a>
              </div>
            </div>
          </div>
        ))}
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
