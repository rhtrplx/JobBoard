import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from "../assets/Logo.png";
import ProfileLogo from "../assets/ProfileLogo.png";
import './Style.css';
import NavigationHeader from '../components/Header';

function ApplicationForm() {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    contactInformations: '',
    city: '',
    country: '',
    zipcode: ''
  });

  // Fetch user data if logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (isLoggedIn) {
      const fetchUserData = async () => {
        try {
          const response = await fetch('http://localhost:5001/api/users', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}` // Add your auth token if needed
            }
          });

          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }

          const userData = await response.json();
          // Set form data with fetched user data
          setFormData({
            name: userData.name || '',
            lastName: userData.lastName || '',
            email: userData.email || '',
            contactInformations: userData.phoneNumber || '',
            city: userData.city || '',
            country: userData.country || '',
            zipcode: userData.zipcode || '',
          });
        } catch (error) {
          console.error(error);
        }
      };

      fetchUserData();
    }
  }, []);

  // Handle form data changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  return (
    <div className="container-fluid">
      <NavigationHeader /> 

      <form className="row g-3 d-flex justify-content-center">
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
          <label htmlFor="contactInformations" className="form-label">Phone Number</label>
          <input type="text" className="form-control" id="contactInformations" value={formData.contactInformations} onChange={handleChange} />
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
          <label htmlFor="exampleFormControlTextarea1" className="form-label">Message</label>
          <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="formFile" className="form-label">Upload Resume</label>
          <input className="form-control" type="file" id="formFile"/>
        </div>
      </form>

      <button className='SendApplication'>Send Application</button>
    </div>
  );
}

export default ApplicationForm;
