import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ArticleForm = ({ isEditMode }) => {
  const { id } = useParams(); // Get the article ID from the URL if in edit mode
  const navigate = useNavigate();

  // State to manage form inputs
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    category: '',
    image: null, // Changed to handle file upload
  });

  // Fetch article data if in edit mode
  useEffect(() => {
    if (isEditMode && id) {
      fetch(`http://localhost:3000/api/articles/${id}`)
        .then((response) => response.json())
        .then((data) => setFormData(data))
        .catch((error) => console.error('Error fetching article:', error));
    }
  }, [isEditMode, id]);

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
      image: e.target.files[0], // Store the selected file
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Retrieve user ID from localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.id) {
      console.error('User not found in localStorage.');
      return;
    }

    const url = isEditMode
      ? `http://localhost:3000/api/articles/update/${id}`
      : 'http://localhost:3000/api/articles/add';
    const method = isEditMode ? 'PUT' : 'POST';

    // Create FormData for file upload
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('content', formData.content);
    formDataToSend.append('author', formData.author);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('user_id', user.id); // Add user_id from localStorage
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }

    // Log FormData for debugging
    for (let [key, value] of formDataToSend.entries()) {
      console.log(key, value);
    }

    try {
      const response = await fetch(url, {
        method,
        body: formDataToSend, // Send FormData instead of JSON
      });

      if (!response.ok) {
        throw new Error('Failed to save article.');
      }

      const result = await response.json();
      console.log(result.message);

      // Redirect to the articles list after successful submission
      navigate('/articles');
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">
        {isEditMode ? 'Edit Article' : 'Add New Article'}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="content">Content</label>
          <textarea
            className="form-control"
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows="5"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            className="form-control"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            className="form-control"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            className="form-control"
            id="image"
            name="image"
            onChange={handleFileChange}
            required={!isEditMode} // Only required for new articles
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {isEditMode ? 'Update Article' : 'Add Article'}
        </button>
      </form>
    </div>
  );
};

export default ArticleForm;