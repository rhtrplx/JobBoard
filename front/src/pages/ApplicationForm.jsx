import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Style.css';
import NavigationHeader from '../components/Header';
import { useLocation, useNavigate } from 'react-router-dom';

function ApplicationForm() {
  const location = useLocation();
  const jobData = location.state?.jobData;
  const navigate = useNavigate(); // To navigate to the home page after submission

  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    contactInformations: '',
    city: '',
    country: '',
    zipcode: '',
    message: '',
    resume: null,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // To control modal visibility

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/user', {
          method: 'GET',
          headers: {
            'Authorization': `${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setFormData((prevData) => ({
          ...prevData,
          name: data.user.name || '',
          lastName: data.user.lastName || '',
          email: data.user.email || '',
          contactInformations: data.user.contactInformations || '',
          city: data.user.city || '',
          country: data.user.country || '',
          zipcode: data.user.zipcode || '',
        }));
      } catch (error) {
        setError('Could not fetch user data');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      resume: e.target.files[0],
    }));
  };

  const handleApply = async (event) => {
    event.preventDefault();
    const submissionData = {
      adId: jobData?.id || "1",
      publisherId: jobData?.publisherId || "1",
      userId: "1",
      name: formData.name,
      lastName: formData.lastName,
      email: formData.email,
      phoneNumber: formData.contactInformations,
      city: formData.city,
      country: formData.country,
      zipcode: formData.zipcode,
      message: formData.message,
      resume: "",
    };

    const formBody = new FormData();
    Object.keys(submissionData).forEach((key) => {
      if (submissionData[key] !== null) {
        formBody.append(key, submissionData[key]);
      }
    });

    try {
      const response = await fetch("http://localhost:5001/api/apply", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(submissionData),
      });

      const result = await response.json();
      if (response.ok) {
        console.log("Application successful:", result);
        setShowModal(true); // Show success modal
        setTimeout(() => {
          navigate("/"); // Redirect to home after 3 seconds
        }, 3000);
      } else {
        console.error("Error during application:", result);
        alert(result.error);
      }
    } catch (error) {
      console.error("Error during request:", error);
    }
  };

  return (
    <div className="container-fluid">
      <NavigationHeader />
      <div className="row">
        {/* Job Information Column */}
        <div className="col-12 col-md-6 order-md-2">
          {jobData ? (
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{jobData.title} - {jobData.contractType}</h5>
                <p className="card-text">{jobData.description}</p>
                <p>Location: {jobData.place}</p>
                <p>Wages: {jobData.wages}</p>
                <p>Working Schedules: {jobData.workingSchedules}</p>
                <p>Publication Date: {jobData.publicationDate}</p>
              </div>
            </div>
          ) : (
            <p>Loading job information...</p>
          )}
        </div>

        {/* Form Column */}
        <div className="col-12 col-md-6 order-md-1">
          <form className="row g-3" onSubmit={handleApply}>
            {['name', 'lastName', 'email', 'contactInformations', 'city', 'country', 'zipcode'].map((field, index) => (
              <div className="col-md-6" key={index}>
                <label htmlFor={field} className="form-label">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                <input
                  type="text"
                  className="form-control"
                  id={field}
                  value={formData[field]}
                  onChange={handleChange}
                  disabled={loading}
                  placeholder={loading ? 'Loading...' : ''}
                />
              </div>
            ))}
            <div className="mb-3">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea
                className="form-control"
                id="message"
                rows="3"
                value={formData.message}
                onChange={handleChange}
                disabled={loading}
                placeholder={loading ? 'Loading...' : ''}
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="formFile" className="form-label">Upload Resume</label>
              <input className="form-control" type="file" id="formFile" onChange={handleFileChange} />
            </div>
            <div className="d-flex justify-content-center">
              <button type="submit" className='btn' style={{ backgroundColor: '#1178be', color: 'white' }} disabled={loading}>Submit Application</button>
            </div>
          </form>
          {loading && <p className="text-muted">Fetching user data...</p>}
          {error && <p className="text-danger">{error}</p>}
        </div>
      </div>

      {/* Modal */}
      <div className={`modal fade ${showModal ? 'show' : ''}`} id="successModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden={!showModal} style={{ display: showModal ? 'block' : 'none' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header" style={{ backgroundColor: '#97cf8a' }}>
              <h1 className="modal-title fs-5" id="exampleModalLabel">Application Successful!</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body" style={{ backgroundColor: '#acd1af', fontWeight: '25px' }}>
              Redirecting to home page.
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default ApplicationForm;
