import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
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
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/users', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
  
        const userData = await response.json();
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
  }, []);

  const token = localStorage.getItem('token');
if (token) {
  // Use token to fetch user details and autofill the form
} else {
  // No token, user must manually fill out the form
}
  

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
          <label htmlFor="message" className="form-label">Message</label>
          <textarea className="form-control" id="message" rows="3"></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="formFile" className="form-label">Upload Resume</label>
          <input className="form-control" type="file" id="formFile"/>
        </div>
        <div className="d-flex justify-content-center">
          <button className='btn btn-primary'>Send Application</button>
        </div>
      </form>
    </div>
  );
}

export default ApplicationForm;
