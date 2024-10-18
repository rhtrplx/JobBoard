import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationHeader from '../components/Header';

function ModifyAccount() {
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

  const [originalData, setOriginalData] = useState({ ...formData });
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false); // Modal visibility state

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/user", {
          method: "GET",
          headers: {
            "Authorization": `${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();

        // Ensure birthdate is in the correct format (YYYY-MM-DD)
        const formattedBirthdate = new Date(data.user.birthdate).toISOString().split('T')[0];

        setFormData({
          name: data.user.name || '',
          lastName: data.user.lastName || '',
          email: data.user.email || '',
          contactInformations: data.user.contactInformations || '',
          password: '', // Do not autofill password
          birthdate: formattedBirthdate,  // Correct format
          title: data.user.title || '',
          description: data.user.description || '',
          city: data.user.city || '',
          country: data.user.country || '',
          zipcode: data.user.zipcode || '',
          username: data.user.username || '',
        });
        setOriginalData(data.user);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setErrorMessage('Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

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
    setErrorMessage('');

    if (formData.password && !validatePassword(formData.password)) {
      setErrorMessage('Password must be at least 8 characters long, contain at least one letter and one number.');
      return;
    }

    const formattedBirthdate = new Date(formData.birthdate).toISOString().split('T')[0];

    const updatedData = {
      ...formData,
      birthdate: formattedBirthdate,
    };

    try {
      const response = await fetch("http://localhost:5001/api/update_account", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error('Failed to update account');
      }

      const data = await response.json();
      console.log('Account updated successfully:', data);

      setShowModal(true); // Show the modal after a successful update

      // Automatically redirect after 3 seconds
      setTimeout(() => {
        setShowModal(false); // Hide modal
        navigate("/profile");
      }, 1000);
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred while updating your account.');
    }
  };

  return (
    <div>
      <NavigationHeader />
      <nav className="navbar navbar-expand-lg">
        <div className="container d-flex justify-content-center align-items-center">
          <h1>Modify your Account</h1>
        </div>
      </nav>

      <div className="container mt-4">
        {loading ? (
          <p>Loading...</p>
        ) : (
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
              <input type="text" className="form-control" id="contactInformations" placeholder="Email or Phone Number" value={formData.contactInformations} onChange={handleChange} />
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

            {errorMessage && <div className="alert alert-danger text-center">{errorMessage}</div>}

            <div className="col-12 d-flex justify-content-center mt-3">
              <button type="submit" className="btn" style={{ backgroundColor: '#386fa4', color: 'white', marginBottom:'30px'}}>Save Changes</button>
            </div>
          </form>
        )}
      </div>

      {/* Modal */}
      <div className={`modal fade ${showModal ? 'show' : ''}`} id="successModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden={!showModal} style={{ display: showModal ? 'block' : 'none' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header" style={{ backgroundColor: '#97cf8a' }}>
              <h1 className="modal-title fs-5" id="exampleModalLabel">Update Successful!</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body" style={{ backgroundColor: '#acd1af', fontWeight: '25px' }}>
              Redirecting to the profile page.
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default ModifyAccount;