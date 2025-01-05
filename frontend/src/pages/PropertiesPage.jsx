import  { useState } from "react";

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
      <h2 className="text-center mb-4">Properties</h2>

      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search properties..."
          onChange={handleFilter}
        />
      </div>

      <div className="row">
        {filteredProperties.map((property) => (
          <div className="col-md-4 mb-4" key={property.id}>
            <div className="card">
              <img
                src={property.imageUrl}
                className="card-img-top"
                alt={property.title}
              />
              <div className="card-body">
                <h5 className="card-title">{property.title}</h5>
                <p className="card-text">{property.description}</p>
                <p className="card-text"><strong>{property.price}</strong></p>
                <a href="#" className="btn btn-primary">
                  View Details
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertiesPage;
