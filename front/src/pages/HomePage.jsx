import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from "../assets/Logo.png";
import ProfileLogo from "../assets/ProfileLogo.png";
import './Style.css';

function HomePage() {
  const [expanded, setExpanded] = useState(null);
  const [ads, setAds] = useState([]);
  const [page, setPage] = useState(0);

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  useEffect(() => {
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
          throw new Error('Failed to fetch ads');
        }

        const data = await response.json();
        setAds(data.ads);
      } catch (error) {
        console.error(error);
        // Optionally handle the error here
      }
    };

    fetchAds();
  }, [page]);

  return (
    <div className="container-fluid">
      <header>
        <div className="HeaderContainer">
          <a className="Logo">
            <img src={logo} alt="Logo" width="100" height="100" />
          </a>
          <a className="ProfileLogo" href="/profile">
            <img src={ProfileLogo} alt="Profile Logo" width="40" height="40" />
          </a>
        </div>
      </header>

      <div className="row" style={{ minHeight: '80vh' }}>
        <nav className="col-md-3 bg-light text-black p-4">
          <h2>Filters</h2>
          <div>
            <input type="text" />
            <button id='filtersubmitbutton'>Submit</button>
          </div>
          <div>
            <div className="btn-group" role="group" aria-label="Basic example">
              <button type="button" className="btn btn filterbutton">CDI</button>
              <button type="button" className="btn btn filterbutton">CDD</button>
              <button type="button" className="btn btn filterbutton">Alternance</button>
            </div>
          </div>
        </nav>

        <main className="col-md-9 bg-white text-black p-4" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
          <h2>Jobs</h2>

          {/* Job Cards based on fetched ads */}
          {ads.length > 0 ? (
            ads.map((ad) => (
              <div key={ad.id} className="card mb-3"> {/* Use a unique identifier */}
                <div className="card-body">
                  <h5 className="card-title">{ad.title} - {ad.contractType}</h5>
                  <p className="card-text">{ad.place}</p>
                  <a
                    className="btn "
                    onClick={() => toggleExpand(ad.id)} // Assuming each ad has a unique ID
                  >
                    Learn More
                  </a>

                  {/* Collapsible content for additional details */}
                  {expanded === ad.id && (
                    <div className="mt-3">
                      <p>{ad.description}</p>
                      <p>{ad.wages}</p>
                      <p>{ad.workingSchedules}</p>
                      <p>{ad.publicationDate}</p>
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

      <footer className="row text-black text-center p-4" style={{ backgroundColor: '#B9D9EB' }}>
        <div className="col">
          <p>Footer Content</p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
