
import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation

const PropertyCard = ({ property, onDelete }) => (
  <div className="col-md-4 mb-3">
    <div className="card h-100 shadow-sm border-0">
      <img
        src={"http://localhost:3000/uploads/" + property.picture}
        className="card-img-top"
        alt={`${property.title}`}
        style={{ height: "150px", objectFit: "cover" }}
      />
      <div className="card-body p-2">
        <h5 className="card-title font-weight-bold" style={{ fontSize: "1rem" }}>
          {property.title}
        </h5>
        <p className="card-text text-muted small">{property.description}</p>
        <p className="card-text h6 text-primary font-weight-bold">
          {property.price}
        </p>
        <Link to={"/edit-property/"+property.id} className="btn btn-primary btn-sm btn-block" aria-label={`View details for ${property.title}`}>
          Update
        </Link>
        <Link to={"/edit-property/"+property.id} className="btn btn-primary btn-sm btn-block" aria-label={`View details for ${property.title}`}>
          View Details
        </Link>

        <button
          onClick={() => onDelete(property.id)}
          className="btn btn-danger btn-sm btn-block"
          aria-label={`Delete ${property.title}`}
        >
          Delete
        </button>
      </div>
    </div>
  </div>
);

const PropertiesPage = () => {
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [allProperties, setAllProperties] = useState([]);

  // Fetch properties from the backend
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/properties/all"); // Replace with your actual backend URL
        if (!response.ok) {
          throw new Error("Failed to fetch properties");
        }
        const data = await response.json();
        setAllProperties(data.properties); // Set all properties
        setFilteredProperties(data.properties); // Set filtered properties to the fetched data
        console.log(data.properties); // Log fetched data for debugging
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  const handleFilter = () => {
    const filterValue = searchQuery.trim().toLowerCase();
    setFilteredProperties(
      allProperties.filter((property) =>
        property.title.toLowerCase().includes(filterValue)
      )
    );
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleFilter();
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/properties/delete/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove the deleted property from the state
        setAllProperties(allProperties.filter(property => property.id !== id));
        setFilteredProperties(filteredProperties.filter(property => property.id !== id));
      } else {
        console.error('Failed to delete property');
      }
    } catch (error) {
      console.error('Error deleting property:', error);
    }
  };

  return (
    <div className="container mt-3">
      <h2 className="text-center mb-3 h3 font-weight-bold">
        Explore Our Properties
      </h2>
      <p className="text-center text-muted mb-3 small">
        Discover your dream home from our curated collection of properties.
      </p>

      {/* Search Bar with Button */}
      <div className="mb-3">
        <div className="input-group" style={{ width: "250px" }}>
          <input
            type="text"
            className="form-control form-control-sm border border-2 rounded-start focus:border-primary focus:shadow-sm transition"
            placeholder="Search properties..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            aria-label="Search properties"
            style={{ transition: "border-color 0.3s ease, box-shadow 0.3s ease" }}
          />
          <button
            className="btn btn-primary btn-sm border border-2 rounded-end hover:bg-dark-primary transition"
            type="button"
            onClick={handleFilter}
            style={{ transition: "background-color 0.3s ease" }}
          >
            Search
          </button>
        </div>
      </div>

      {/* Add Property Button */}
      <div className="mb-3 text-right">
        <Link to="/add-property" className="btn btn-success btn-sm">
          Add Property
        </Link>
      </div>

      {/* Property Cards */}
      <div className="row">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} onDelete={handleDelete} />
          ))
        ) : (
          <p className="text-center text-muted w-100 small">
            No properties match your search.
          </p>
        )}
      </div>

      {/* Call-to-Action Section */}
      <div className="text-center mt-3">
        <h3 className="h5 font-weight-bold">Can't Find What You're Looking For?</h3>
        <p className="text-muted mb-2 small">
          Contact us for personalized assistance in finding your dream property.
        </p>
        <a href="/contact" className="btn btn-outline-primary btn-sm">
          Contact Us
        </a>
      </div>
    </div>
  );
};

export default PropertiesPage;


// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom"; // Import Link for navigation

// const PropertyCard = ({ property }) => (
//   <div className="col-md-4 mb-3">
//     <div className="card h-100 shadow-sm border-0">
//       <img
//         src={"http://localhost:3000/uploads/" + property.picture}
//         className="card-img-top"
//         alt={`${property.title}`}
//         style={{ height: "150px", objectFit: "cover" }}
//       />
//       <div className="card-body p-2">
//         <h5 className="card-title font-weight-bold" style={{ fontSize: "1rem" }}>
//           {property.title}
//         </h5>
//         <p className="card-text text-muted small">{property.description}</p>
//         <p className="card-text h6 text-primary font-weight-bold">
//           {property.price}
//         </p>
//         <Link to={"/edit-property/"+property.id} className="btn btn-primary btn-sm btn-block" aria-label={`View details for ${property.title}`}>
//           Update
//         </Link>
//         <Link to={"/edit-property/"+property.id} className="btn btn-primary btn-sm btn-block" aria-label={`View details for ${property.title}`}>
//           View Details
//         </Link>

//         <Link to={"/delete-property/"+property.id} className="btn btn-danger btn-sm btn-block" aria-label={`View details for ${property.title}`}>
//           Delete
//         </Link>
//       </div>
//     </div>
//   </div>
// );

// const PropertiesPage = () => {
//   const [filteredProperties, setFilteredProperties] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [allProperties, setAllProperties] = useState([]);

//   // Fetch properties from the backend
//   useEffect(() => {
//     const fetchProperties = async () => {
//       try {
//         const response = await fetch("http://localhost:3000/api/properties/all"); // Replace with your actual backend URL
//         if (!response.ok) {
//           throw new Error("Failed to fetch properties");
//         }
//         const data = await response.json();
//         setAllProperties(data.properties); // Set all properties
//         setFilteredProperties(data.properties); // Set filtered properties to the fetched data
//         console.log(data.properties); // Log fetched data for debugging
//       } catch (error) {
//         console.error("Error fetching properties:", error);
//       }
//     };

//     fetchProperties();
//   }, []);

//   const handleFilter = () => {
//     const filterValue = searchQuery.trim().toLowerCase();
//     setFilteredProperties(
//       allProperties.filter((property) =>
//         property.title.toLowerCase().includes(filterValue)
//       )
//     );
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       handleFilter();
//     }
//   };

//   return (
//     <div className="container mt-3">
//       <h2 className="text-center mb-3 h3 font-weight-bold">
//         Explore Our Properties
//       </h2>
//       <p className="text-center text-muted mb-3 small">
//         Discover your dream home from our curated collection of properties.
//       </p>

//       {/* Search Bar with Button */}
//       <div className="mb-3">
//         <div className="input-group" style={{ width: "250px" }}>
//           <input
//             type="text"
//             className="form-control form-control-sm border border-2 rounded-start focus:border-primary focus:shadow-sm transition"
//             placeholder="Search properties..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             onKeyPress={handleKeyPress}
//             aria-label="Search properties"
//             style={{ transition: "border-color 0.3s ease, box-shadow 0.3s ease" }}
//           />
//           <button
//             className="btn btn-primary btn-sm border border-2 rounded-end hover:bg-dark-primary transition"
//             type="button"
//             onClick={handleFilter}
//             style={{ transition: "background-color 0.3s ease" }}
//           >
//             Search
//           </button>
//         </div>
//       </div>

//       {/* Add Property Button */}
//       <div className="mb-3 text-right">
//         <Link to="/add-property" className="btn btn-success btn-sm">
//           Add Property
//         </Link>
//       </div>

//       {/* Property Cards */}
//       <div className="row">
//         {filteredProperties.length > 0 ? (
//           filteredProperties.map((property) => (
//             <PropertyCard key={property.id} property={property} />
//           ))
//         ) : (
//           <p className="text-center text-muted w-100 small">
//             No properties match your search.
//           </p>
//         )}
//       </div>

//       {/* Call-to-Action Section */}
//       <div className="text-center mt-3">
//         <h3 className="h5 font-weight-bold">Can't Find What You're Looking For?</h3>
//         <p className="text-muted mb-2 small">
//           Contact us for personalized assistance in finding your dream property.
//         </p>
//         <a href="/contact" className="btn btn-outline-primary btn-sm">
//           Contact Us
//         </a>
//       </div>
//     </div>
//   );
// };

// export default PropertiesPage;


