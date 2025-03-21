import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const PropertyForm = ({ isEditMode }) => {
  const { id } = useParams(); // Get the property ID from the URL if in edit mode
  const navigate = useNavigate();

  // State to manage form inputs
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    size: '',
    category: '', // Added category field
    picture: null,
    existingPicture: '',
  });

  // Fetch property data if in edit mode
  useEffect(() => {
    if (isEditMode && id) {
      const fetchProperty = async () => {
        try {
          const response = await fetch(`http://localhost:3000/api/properties/${id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch property.');
          }
          const data = await response.json();
          console.log('API Response:', data); // Debugging log

          // Update formData with fetched data
          setFormData({
            title: data.property.title || '',
            description: data.property.description || '',
            price: data.property.price || '',
            location: data.property.location || '',
            size: data.property.size || '',
            category: data.property.category || '', // Set category
            picture: null, // Reset picture file input
            existingPicture: data.property.picture || '', // Set existing picture URL
          });

          console.log('Data to set in formData:', {
            title: data.property.title,
            description: data.property.description,
            price: data.property.price,
            location: data.property.location,
            size: data.property.size,
            category: data.property.category, // Log category
            existingPicture: data.property.picture,
          });
        } catch (error) {
          console.error('Error fetching property:', error);
        }
      };

      fetchProperty();
    }
  }, [isEditMode, id]);

  // Log updated formData whenever it changes
  useEffect(() => {
    console.log('Updated Form Data:', formData);
  }, [formData]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      picture: e.target.files[0], // Store the selected file
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Retrieve user ID from localStorage
    const userr = JSON.parse(localStorage.getItem('userr'));
    if (!userr || !userr.id) {
      console.error('User not found in localStorage.');
      return;
    }

    // Create FormData for file upload
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('location', formData.location);
    formDataToSend.append('size', formData.size);
    formDataToSend.append('category', formData.category); // Add category
    formDataToSend.append('user_id', userr.id);

    // Append the picture if a new file is uploaded, otherwise append the existing picture URL
    if (formData.picture) {
      formDataToSend.append('picture', formData.picture);
    } else {
      formDataToSend.append('picture', formData.existingPicture);
    }

    // Determine the URL and method based on edit mode
    const url = isEditMode
      ? `http://localhost:3000/api/properties/update/${id}`
      : 'http://localhost:3000/api/properties/add';
    const method = isEditMode ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Failed to save property.');
      }

      const result = await response.json();
      console.log(result.message);

      // Redirect to the properties list after successful submission
      navigate('/properties');
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">
        {isEditMode ? 'Edit Property' : 'Add New Property'}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control "
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            className="form-control"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="size">Size (sqft)</label>
          <input
            type="number"
            className="form-control"
            id="size"
            name="size"
            value={formData.size}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="category">Category</label>
          <select
            className="form-control"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select a category</option>
            <option value="villa">Villa</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="picture">Picture</label>
          <input
            type="file"
            className="form-control"
            id="picture"
            name="picture"
            onChange={handleFileChange}
            required={!isEditMode} // Only required for new properties
          />
          {isEditMode && formData.existingPicture && (
            <div className="mt-2">
              <img
                src={`http://localhost:3000/uploads/${formData.existingPicture}`}
                alt="Existing Property"
                style={{ width: '100px', height: 'auto' }}
              />
              <p className="text-muted small mt-1">Current Picture</p>
            </div>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          {isEditMode ? 'Update Property' : 'Add Property'}
        </button>
      </form>
    </div>
  );
};

export default PropertyForm;

// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';

// const PropertyForm = ({ isEditMode }) => {
//   const { id } = useParams(); // Get the property ID from the URL if in edit mode
//   const navigate = useNavigate();

//   // State to manage form inputs
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     price: '',
//     location: '',
//     size: '',
//     category: '', // Added category field
//     picture: null,
//     existingPicture: '',
//   });

//   // Fetch property data if in edit mode
//   useEffect(() => {
//     if (isEditMode && id) {
//       const fetchProperty = async () => {
//         try {
//           const response = await fetch(`http://localhost:3000/api/properties/${id}`);
//           if (!response.ok) {
//             throw new Error('Failed to fetch property.');
//           }
//           const data = await response.json();
//           console.log('API Response:', data); // Debugging log

//           // Update formData with fetched data
//           setFormData({
//             title: data.property.title || '',
//             description: data.property.description || '',
//             price: data.property.price || '',
//             location: data.property.location || '',
//             size: data.property.size || '',
//             category: data.property.category || '', // Set category
//             picture: null, // Reset picture file input
//             existingPicture: data.property.picture || '', // Set existing picture URL
//           });

//           console.log('Data to set in formData:', {
//             title: data.property.title,
//             description: data.property.description,
//             price: data.property.price,
//             location: data.property.location,
//             size: data.property.size,
//             category: data.property.category, // Log category
//             existingPicture: data.property.picture,
//           });
//         } catch (error) {
//           console.error('Error fetching property:', error);
//         }
//       };

//       fetchProperty();
//     }
//   }, [isEditMode, id]);

//   // Log updated formData whenever it changes
//   useEffect(() => {
//     console.log('Updated Form Data:', formData);
//   }, [formData]);

//   // Handle form input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   // Handle file input changes
//   const handleFileChange = (e) => {
//     setFormData({
//       ...formData,
//       picture: e.target.files[0], // Store the selected file
//     });
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Retrieve user ID from localStorage
//     const userr = JSON.parse(localStorage.getItem('userr'));
//     if (!userr || !userr.id) {
//       console.error('User not found in localStorage.');
//       return;
//     }

//     // Create FormData for file upload
//     const formDataToSend = new FormData();
//     formDataToSend.append('title', formData.title);
//     formDataToSend.append('description', formData.description);
//     formDataToSend.append('price', formData.price);
//     formDataToSend.append('location', formData.location);
//     formDataToSend.append('size', formData.size);
//     formDataToSend.append('category', formData.category); // Add category
//     formDataToSend.append('user_id', userr.id);

//     // Append the picture if a new file is uploaded, otherwise append the existing picture URL
//     if (formData.picture) {
//       formDataToSend.append('picture', formData.picture);
//     } else {
//       formDataToSend.append('picture', formData.existingPicture);
//     }

//     // Determine the URL and method based on edit mode
//     const url = isEditMode
//       ? `http://localhost:3000/api/properties/update/${id}`
//       : 'http://localhost:3000/api/properties/add';
//     const method = isEditMode ? 'PUT' : 'POST';

//     try {
//       const response = await fetch(url, {
//         method,
//         body: formDataToSend,
//       });

//       if (!response.ok) {
//         throw new Error('Failed to save property.');
//       }

//       const result = await response.json();
//       console.log(result.message);

//       // Redirect to the properties list after successful submission
//       navigate('/properties');
//     } catch (error) {
//       console.error('Error:', error.message);
//     }
//   };

//   return (
//     <div className="container my-5">
//       <h2 className="text-center mb-4">
//         {isEditMode ? 'Edit Property' : 'Add New Property'}
//       </h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group mb-3">
//           <label htmlFor="title">Title</label>
//           <input
//             type="text"
//             className="form-control"
//             id="title"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group mb-3">
//           <label htmlFor="description">Description</label>
//           <textarea
//             className="form-control"
//             id="description"
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             rows="3"
//             required
//           />
//         </div>
//         <div className="form-group mb-3">
//           <label htmlFor="price">Price</label>
//           <input
//             type="number"
//             className="form-control"
//             id="price"
//             name="price"
//             value={formData.price}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group mb-3">
//           <label htmlFor="location">Location</label>
//           <input
//             type="text"
//             className="form-control"
//             id="location"
//             name="location"
//             value={formData.location}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group mb-3">
//           <label htmlFor="size">Size (sqft)</label>
//           <input
//             type="number"
//             className="form-control"
//             id="size"
//             name="size"
//             value={formData.size}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group mb-3">
//           <label htmlFor="category">Category</label>
//           <select
//             className="form-control"
//             id="category"
//             name="category"
//             value={formData.category}
//             onChange={handleChange}
//             required
//           >
//             <option value="" disabled>Select a category</option>
//             <option value="villa">Villa</option>
//             <option value="apartment">Apartment</option>
//             <option value="house">House</option>
//             <option value="other">Other</option>
//           </select>
//         </div>
//         <div className="form-group mb-3">
//           <label htmlFor="picture">Picture</label>
//           <input
//             type="file"
//             className="form-control"
//             id="picture"
//             name="picture"
//             onChange={handleFileChange}
//             required={!isEditMode} // Only required for new properties
//           />
//           {isEditMode && formData.existingPicture && (
//             <div className="mt-2">
//               <img
//                 src={`http://localhost:3000/uploads/${formData.existingPicture}`}
//                 alt="Existing Property"
//                 style={{ width: '100px', height: 'auto' }}
//               />
//               <p className="text-muted small mt-1">Current Picture</p>
//             </div>
//           )}
//         </div>
//         <button type="submit" className="btn btn-primary">
//           {isEditMode ? 'Update Property' : 'Add Property'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default PropertyForm;

