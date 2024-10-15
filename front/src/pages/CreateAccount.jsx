import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationHeader from '../components/Header';
import './Style.css';

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
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const validatePassword = (password) => {
    const passwordRules = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRules.test(password);
  };

  const validateForm = () => {
    for (let field in formData) {
      if (formData[field] === '') {
        setModalMessage(`Please fill out the ${field} field.`);
        setShowModal(true);
        return false;
      }
    }

    if (!validatePassword(formData.password)) {
      setModalMessage('Password must be at least 8 characters long and contain at least one letter and one number.');
      setShowModal(true);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await fetch("http://localhost:5001/api/signup", {
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

      localStorage.setItem('token', data.token);
      localStorage.setItem('name', formData.name);
      
      setModalMessage('Account created successfully!');
      setShowModal(true);

      setTimeout(() => {
        setShowModal(false);
        navigate("/");
      }, 2000);

    } catch (error) {
      setModalMessage(error.message || 'Failed to create account.');
      setShowModal(true);
    }
  };

  return (
    <div>
      <NavigationHeader />
      <div className="container mt-4">
        <div className="row">
          {/* Left Column */}
          <div className="col-md-6">
            <form className="row g-3" onSubmit={handleSubmit}>
              <div className="col-12">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" value={formData.name} onChange={handleChange} />
              </div>
              <div className="col-12">
                <label htmlFor="lastName" className="form-label">Last Name</label>
                <input type="text" className="form-control" id="lastName" value={formData.lastName} onChange={handleChange} />
              </div>
              <div className="col-12">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" value={formData.email} onChange={handleChange} />
              </div>
              <div className="col-12">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" value={formData.password} onChange={handleChange} />
              </div>
              <div className="col-12">
                <label htmlFor="birthdate" className="form-label">Birthday</label>
                <input type="date" className="form-control" id="birthdate" value={formData.birthdate} onChange={handleChange} />
              </div>
              <div className="col-12">
                <label htmlFor="username" className="form-label">Username</label>
                <input type="text" className="form-control" id="username" value={formData.username} onChange={handleChange} />
              </div>
            </form>
          </div>

          {/* Right Column */}
          <div className="col-md-6 d-flex flex-column justify-content-between">
            <div>
              <div className="col-12">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" id="title" value={formData.title} onChange={handleChange} />
              </div>
              <div className="col-12">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea className="form-control" id="description" rows="4" value={formData.description} onChange={handleChange}></textarea>
              </div>
              <div className="col-12">
                <label htmlFor="city" className="form-label">City</label>
                <input type="text" className="form-control" id="city" value={formData.city} onChange={handleChange} />
              </div>
              <div className="col-12">
                <label htmlFor="country" className="form-label">Country</label>
                <input type="text" className="form-control" id="country" value={formData.country} onChange={handleChange} />
              </div>
              <div className="col-12">
                <label htmlFor="zipcode" className="form-label">Zipcode</label>
                <input type="text" className="form-control" id="zipcode" value={formData.zipcode} onChange={handleChange} />
              </div>
            </div>
            
            {/* Create Account Button */}
            <div className="d-flex justify-content-end mt-3">
              <button type="submit" className="btn" style={{ backgroundColor: '#1178be', color: 'white', borderColor:'#6F00FF'}}>Create Account</button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Notification</h5>
              <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
            </div>
            <div className="modal-body">
              <p>{modalMessage}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
