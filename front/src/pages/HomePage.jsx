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
  const navigate = useNavigate();

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  // Fetch ads from the API
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

  // Call fetchAds when the component mounts or page changes
  useEffect(() => {
    fetchAds();
  }, [page]);

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
                  {expanded === ad.id && (
                    <div className="mt-3">
                      <p>{ad.place}</p>
                      <p>{ad.wages}</p>
                      <p>{ad.workingSchedules}</p>
                      <p>{ad.publicationDate}</p>

                      {/* Pass ad data to ApplyNowButton */}
                      <ApplyNowButton jobData={ad} />
                      <button className='Save'>Save</button>
                    </div>
                  )}
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
