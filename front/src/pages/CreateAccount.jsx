import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import logo from "../assets/Logo.png";
import CreateAccountButton from '../components/CreateAccountButton';
import './Style.css';

function FrontPage() {
  const navigate = useNavigate(); // Initialize useNavigate
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    birthdate: '',
    title: '',
    description: '',
    city: '',
    country: '',
    zipcode: '',
    contactInformations: '',
    username: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      const response = await fetch("http://localhost:5001/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to sign up');
      }

      const data = await response.json();
      console.log('Success:', data);

      // Navigate to home after successful signup
      navigate("/home");

    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      {/* Navbar with Logo */}
      <nav className="navbar navbar-expand-lg">
        <div className="container d-flex justify-content-center align-items-center">
          <a className="navbar-brand">
            <img src={logo} alt="Logo" width="120" height="120" />
          </a>
        </div>
      </nav>

      {/* Form Section */}
      <div className="container mt-4">
        <form className="row g-3 d-flex justify-content-center" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" value={formData.name} onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <label htmlFor="lastName" className="form-label">Last Name</label>
            <input type="text" className="form-control" id="lastName" value={formData.lastName} onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" value={formData.email} onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <label htmlFor="contactInformations" className="form-label">Contact Information</label>
            <input type="text" className="form-control" id="contactInformations" value={formData.contactInformations} onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" value={formData.password} onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <label htmlFor="birthdate" className="form-label">Birthday</label>
            <input type="date" className="form-control" id="birthdate" value={formData.birthdate} onChange={handleChange} />
          </div>
          <div className="col-md-12">
            <label htmlFor="username" className="form-label">User Name</label>
            <input type="text" className="form-control" id="username" placeholder="Expert in Cybersecurity" value={formData.username} onChange={handleChange} />
          </div>
          <div className="col-md-12">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" placeholder="Expert in Cybersecurity" value={formData.title} onChange={handleChange} />
          </div>
          <div className="col-md-12">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea className="form-control" id="description" placeholder="Hi, my name is..." rows="4" value={formData.description} onChange={handleChange}></textarea>
          </div>

          <div className="row g-3 Location d-flex justify-content-center">
            <div className="col-md-4">
              <label htmlFor="city" className="form-label">City</label>
              <input type="text" className="form-control" id="city" value={formData.city} onChange={handleChange} />
            </div>

            <div className="col-md-4">
              <label htmlFor="country" className="form-label">Country</label>
              <input type="text" className="form-control" id="country" value={formData.country} onChange={handleChange} />
            </div>

            <div className="col-md-4">
              <label htmlFor="zipcode" className="form-label">Zip</label>
              <input type="text" className="form-control" id="zipcode" value={formData.zipcode} onChange={handleChange} />
            </div>
          </div>
          
          <div className="col-12 d-flex justify-content-center mt-3">
            <CreateAccountButton onClick={handleSubmit} />
          </div>
          
        </form>
      </div>
    </div>
  );
}

export default FrontPage;
