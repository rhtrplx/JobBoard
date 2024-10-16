import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../assets/Logo.png";
import './Style.css';
import NavigationHeader from '../components/Header';

function CreateAccount() {
  const navigate = useNavigate();
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
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const validatePassword = (password) => {
    const passwordRules = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRules.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    for (const [key, value] of Object.entries(formData)) {
      if (!value) {
        setAlertMessage(`${key.charAt(0).toUpperCase() + key.slice(1)} is required.`); // Capitalize the first letter for better user feedback
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 3000); // Hide alert after 3 seconds
        return;
      }
    }

    // Check if the password is valid
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,63}$/;
    if (!emailPattern.test(formData.email)) {
      setAlertMessage('Please enter a valid email address.');
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      return;
    }

    if (!validatePassword(formData.password)) {
      setAlertMessage('Password must be at least 8 characters long and contain at least one letter and one number.');
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000); // Hide alert after 3 seconds
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create account');
      }

      // Assuming the API returns a token on successful signup
      const token = data.token; // Adjust this according to your API response structure
      localStorage.setItem('token', token); // Store token in local storage

      // Save the user's name directly from formData to local storage
      localStorage.setItem('name', formData.name);

      // Show success alert
      setAlertMessage('Account created successfully!');
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        navigate("/"); // Navigate to home or desired route
      }, 3000); // Hide alert after 3 seconds
    } catch (error) {
      console.error('Error:', error);
      setAlertMessage(error.message || 'Error: Failed to create account.');
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000); // Hide alert after 3 seconds
    }
  };

  return (
    <div>
      <NavigationHeader />

      <div className="container mt-4">
        <form className="row g-3" onSubmit={handleSubmit}>
          {/* Left Column */}
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control custom-input" id="name" value={formData.name} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="lastName" className="form-label">Last Name</label>
              <input type="text" className="form-control custom-input" id="lastName" value={formData.lastName} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control custom-input"
                id="email"
                value={formData.email}
                onChange={handleChange}
                pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,63}$"
                title="Please enter a valid email address in the format username@domain.tld (e.g., john@company.org)."
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control custom-input" id="password" value={formData.password} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="contactInformations" className="form-label">Contact Information</label>
              <input type="text" className="form-control custom-input" id="contactInformations" value={formData.contactInformations} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="username" className="form-label">User Name</label>
              <input type="text" className="form-control custom-input" id="username" placeholder="Example01" value={formData.username} onChange={handleChange} />
            </div>
          </div>

          {/* Right Column */}
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="birthdate" className="form-label">Birthday</label>
              <input type="date" className="form-control custom-input" id="birthdate" value={formData.birthdate} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="title" className="form-label">Title</label>
              <input type="text" className="form-control custom-input" id="title" placeholder="Expert in Cybersecurity" value={formData.title} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea className="form-control custom-input" id="description" placeholder="Hi, my name is..." rows="4" value={formData.description} onChange={handleChange}></textarea>
            </div>
            <div className="row g-3">
              <div className="col-4">
                <label htmlFor="city" className="form-label">City</label>
                <input type="text" className="form-control custom-input" id="city" value={formData.city} onChange={handleChange} />
              </div>
              <div className="col-4">
                <label htmlFor="country" className="form-label">Country</label>
                <input type="text" className="form-control custom-input" id="country" value={formData.country} onChange={handleChange} />
              </div>
              <div className="col-4">
                <label htmlFor="zipcode" className="form-label">Zip</label>
                <input type="text" className="form-control custom-input" id="zipcode" value={formData.zipcode} onChange={handleChange} />
              </div>

              <div className="col-12 d-flex justify-content-left mt-3">
                <button
                  type="submit"
                  className="btn custom-button"
                  style={{ color: 'white', marginTop: '30px' }}
                >
                  Create an Account
                </button>
              </div>
            </div>
          </div>
        </form>

        {showAlert && (
          <div className="container mt-3">
            <div className="alert alert-primary" role="alert">
              {alertMessage}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateAccount;
