import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from "../assets/Logo.png";
import ProfileLogo from "../assets/ProfileLogo.png";
import HomeLogo from "../assets/HomeLogo.png";
import './Style.css';
import { useNavigate } from 'react-router-dom';

function ApplicationForm() {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    city: '',
    country: '',
    zipcode: '',
    message: '',
    resume: null,
  });

  const navigate = useNavigate();

  // Check if user is logged in and auto-fill form
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
      const user = JSON.parse(localStorage.getItem('user')); // Get user details from localStorage
      if (user) {
        setFormData({
          name: user.name,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          city: user.city,
          country: user.country,
          zipcode: user.zipcode,
          message: '',
          resume: null,
        });
      }
    }
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      resume: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create FormData to handle file upload
    const data = new FormData();
    data.append('name', formData.name);
    data.append('lastName', formData.lastName);
    data.append('email', formData.email);
    data.append('phoneNumber', formData.phoneNumber);
    data.append('city', formData.city);
    data.append('country', formData.country);
    data.append('zipcode', formData.zipcode);
    data.append('message', formData.message);
    data.append('resume', formData.resume);

    // Send a POST request to the backend
    fetch('http://localhost:5001/api/apply', {
      method: 'POST',
      body: data,
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      // Redirect to another page after successful submission
      navigate('/home');
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <div>
      {/* Navbar with Logo */}
      <header>
        <div className="HeaderContainer">
          <a className="Logo">
            <img src={logo} alt="Logo" width="100" height="100" />
          </a>
          <a className="ProfileLogo" href="/profile">
            <img src={ProfileLogo} alt="Profile Logo" width="40" height="40" />
          </a>
          <a className="HomeLogo" href="/">
              <img src={HomeLogo} alt="Home Logo" width="40" height="40" />
          </a>
        </div>
      </header>

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
          <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
          <input type="text" className="form-control" id="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
        </div>

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

        <div className="mb-3">
          <label htmlFor="message" className="form-label">Message</label>
          <textarea className="form-control" id="message" rows="3" onChange={handleChange}></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="formFile" className="form-label">Upload Resume</label>
          <input className="form-control" type="file" id="formFile" onChange={handleFileChange} />
        </div>

        <button type="submit" className="btn btn-primary">Send Application</button>
      </form>
    </div>
  );
}

export default ApplicationForm;
