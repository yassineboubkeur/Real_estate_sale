import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const PropertyDetails = () => {
  const { id } = useParams(); // Get the property ID from the URL
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch property details from the backend
  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/properties/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch property details");
        }
        const data = await response.json();
        setProperty(data.property); // Set the fetched property
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [id]);

  if (loading) {
    return <p className="text-center">Loading property details...</p>;
  }

  if (error) {
    return <p className="text-center text-danger">Error: {error}</p>;
  }

  if (!property) {
    return <p className="text-center">Property not found.</p>;
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">{property.title}</h2>
      <div className="row">
        <div className="col-md-6">
          <img
            src={`http://localhost:3000/uploads/${property.picture}`}
            alt={property.title}
            className="img-fluid rounded"
            style={{ maxHeight: "400px", objectFit: "cover" }}
          />
        </div>
        <div className="col-md-6">
          <h4 className="mb-3">Details</h4>
          <p className="text-muted">{property.description}</p>
          <ul className="list-unstyled">
            <li>
              <strong>Price:</strong> ${property.price}
            </li>
            <li>
              <strong>Location:</strong> {property.location}
            </li>
            <li>
              <strong>Size:</strong> {property.size} sqft
            </li>
            <li>
              <strong>Added by:</strong> User ID {property.user_id}
            </li>
          </ul>
          <Link to="/" className="btn btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;