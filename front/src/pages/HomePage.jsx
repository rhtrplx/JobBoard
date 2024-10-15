import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Style.css';
import { useNavigate } from 'react-router-dom';
import NavigationHeader from '../components/Header';
import ApplyNowButton from '../components/ApplyNow';

function HomePage() {
  const [expanded, setExpanded] = useState(null);
  const [ads, setAds] = useState([]);
  const [page, setPage] = useState(0);
  const [adDetails, setAdDetails] = useState(null); // To hold additional details for the selected ad
  const navigate = useNavigate();

  const isAuthenticated = localStorage.getItem('user'); // Example check for authentication

  const toggleExpand = async (id) => {
    if (expanded === id) {
      setExpanded(null);
      setAdDetails(null); // Clear details if collapsing
    } else {
      setExpanded(id);
      await fetchAdDetails(id); // Fetch details when expanding
    }
  };

  const fetchAds = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/ads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ page }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      setAds(data.ads);
    } catch (error) {
      console.error("Failed to fetch ads:", error);
      alert("Failed to fetch ads. Please try again later.");
    }
  };

  const fetchAdDetails = async (id) => {
    try {
      const response = await fetch(`http://localhost:5001/api/ads/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data);
      setAdDetails(data); // Update state with the fetched details
    } catch (error) {
      console.error("Failed to fetch ad details:", error);
      alert("Failed to fetch ad details. Please try again later.");
    }
  };

  useEffect(() => {
    fetchAds();
  }, [page]);

  useEffect(() => {
    if (!isAuthenticated) {
      console.log("User is not authenticated");
      // navigate('/login'); // Uncomment if you want to redirect to login
    }
  }, [isAuthenticated]);

  return (
    <div className="container-fluid">
      <NavigationHeader />

      <div className="row" style={{ minHeight: '80vh' }}>
        <nav className="col-md-3 bg-white text-black p-4">
          <h2>Filters</h2>
          <div>
            <input type="text" />
            <button id='filtersubmit'>Submit</button>
          </div>
          <div>
            <div className="btn-group" role="group" aria-label="Basic example">
              <button type="button" className="btn filteroption">CDI</button>
              <button type="button" className="btn filteroption">CDD</button>
              <button type="button" className="btn filteroption">Alternance</button>
            </div>
          </div>
        </nav>

        <main className="col-md-9 bg-white text-black p-4" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
          <h2>Jobs</h2>

          {/* Job Cards based on fetched ads */}
          {ads.length > 0 ? (
            ads.map((ad) => (
              <div key={ad.id} className="card mb-3">
                <div className="card-body">
                  <h5 className="card-title">{ad.title} - {ad.contractType}</h5>
                  <p className="card-text">{ad.description}</p>
                  <a
                    className="btn learnmorebtn"
                    onClick={() => toggleExpand(ad.id)}
                  >
                    Learn More
                  </a>

                  {/* Collapsible content for additional details */}
                  <div className={`collapsible ${expanded === ad.id ? 'open' : ''}`}>
                    {expanded === ad.id && adDetails && adDetails.id === ad.id && ( // Ensure details correspond to the expanded ad
                      <div className="mt-3">
                        <p><strong>Location:</strong> {adDetails.place}</p>
                        <p><strong>Wages:</strong> {adDetails.wages}</p>
                        <p><strong>Working Schedules:</strong> {adDetails.workingSchedules}</p>
                        <p><strong>Publication Date:</strong> {new Date(adDetails.publicationDate).toLocaleDateString()}</p>

                        {/* Pass ad data to ApplyNowButton */}
                        <ApplyNowButton jobData={adDetails} />
                        <button className='Save'>Save</button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No ads available.</p>
          )}
        </main>
      </div>
    </div>
  );
}

export default HomePage;
