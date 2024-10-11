import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Style.css';
import NavigationHeader from '../components/Header';
import { useLocation } from 'react-router-dom';

function ApplicationForm() {
  const location = useLocation();
  const jobData = location.state?.jobData;

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

  // Fetch user data if logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return; // No token, skip fetching
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/users', {
          method: 'GET',
          headers: {
            'Authorization': `${token}`, // Ensure proper format
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();

        console.log(data);

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
        setLoading(false); // Stop loading
      }
    };

    fetchUserData();
  }, []); // Empty dependency array to run on component mount

  // Handle form data changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Handle file change
  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      resume: e.target.files[0],
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Implement form submission logic here
  };

  const handleApply = async (event) => {
    event.preventDefault();

    // Construire formData avec les valeurs actuelles
    const submissionData = {
      adId: "1",  // Récupérer l'ID de l'annonce si disponible
      publisherId: "1",  // Récupérer l'ID du publisher si disponible
      userId: "1",  // Vous pouvez récupérer cet ID s'il est disponible
      // adId: jobData?.id,  // Récupérer l'ID de l'annonce si disponible
      // publisherId: jobData?.publisherId,  // Récupérer l'ID du publisher si disponible
      // userId: null,  // Vous pouvez récupérer cet ID s'il est disponible
      name: formData.name,  // Nom de l'utilisateur
      lastName: formData.lastName,  // Prénom
      email: formData.email,  // Email
      phoneNumber: formData.contactInformations,  // Numéro de téléphone ou autre contact
      city: formData.city,  // Ville
      country: formData.country,  // Pays
      zipcode: formData.zipcode,  // Code postal
      message: formData.message,  // Message de l'utilisateur
      resume: "",  // Fichier de CV (si besoin)
    };

    // Vérifier si vous devez envoyer le fichier "resume"
    const formBody = new FormData();
    Object.keys(submissionData).forEach((key) => {
      if (submissionData[key] !== null) {
        formBody.append(key, submissionData[key]);
      }
    });

    console.log(JSON.stringify(submissionData))
    // Envoyer les données via POST au backend Flask
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
        console.log("Application réussie:", result);
      } else {
        console.error("Erreur lors de l'application:", result);
      }
    } catch (error) {
      console.error("Erreur lors de la requête:", error);
    }
  };


  return (
    <div className="container-fluid">
      <NavigationHeader />

      <div className="row">
        {/* Form Column on the Left */}
        <div className="col-md-6">
          <form className="row g-3" onSubmit={handleSubmit}>
            {['name', 'lastName', 'email', 'contactInformations', 'city', 'country', 'zipcode'].map((field, index) => (
              <div className="col-md-6" key={index}>
                <label htmlFor={field} className="form-label">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                <input
                  type="text"
                  className="form-control"
                  id={field}
                  value={formData[field]}
                  onChange={handleChange}
                  disabled={loading} // Disable input while loading
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
                disabled={loading} // Disable textarea while loading
                placeholder={loading ? 'Loading...' : ''}
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="formFile" className="form-label">Upload Resume</label>
              <input className="form-control" type="file" id="formFile" onChange={handleFileChange} />
            </div>
            <div className="d-flex justify-content-center">
              <button type="submit" className='btn btn-primary' disabled={loading} onClick={handleApply}>Submit Application</button>
            </div>
          </form>
          {loading && <p className="text-muted">Fetching user data...</p>} {/* Loading message */}
          {error && <p className="text-danger">{error}</p>} {/* Error message */}
        </div>

        {/* Job Information Column on the Right */}
        <div className="col-md-6">
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
      </div>
    </div>
  );
}

export default ApplicationForm;
