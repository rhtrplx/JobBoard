import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from "../assets/Logo.png";
import ProfileLogo from "../assets/ProfileLogo.png";
import Logout from "../assets/Logout.png";
import './Style.css';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [expanded, setExpanded] = useState(null);
  const [ads, setAds] = useState([]);
  const [page, setPage] = useState(0);
  const navigate = useNavigate();

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
      }
    };

    fetchAds();
  }, [page]);

  // Check if the user is logged in
  const isLoggedIn = () => {
    return localStorage.getItem('isLoggedIn') === 'true'; // Check the login status stored in localStorage
  };

  // Handle Apply Now button click
  const handleApplyNowClick = () => {
    if (isLoggedIn()) {
      // If logged in, navigate to the application form
      navigate('/applicationform');
    } else {
      // If not logged in, redirect to login page or show an alert
      alert('Please log in to apply.');
      navigate('/login?redirect=/applicationform');
    }
  };

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
          {/* Adding Logout button */}
          <img src={Logout} alt="Logout" width="40" height="40" className='Logout' onClick={() => {
            localStorage.removeItem('isLoggedIn');
            navigate('/login');
          }} style={{ cursor: 'pointer' }} />
        </div>
      </header>

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

                      {/* Apply Now button with login check */}
                      <button className='ApplyNow' onClick={handleApplyNowClick}>Apply Now!</button>
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

      <footer className="row text-black text-center p-4" style={{ backgroundColor: '#B9D9EB' }}>
        <div className="col">
          <p>Footer Content</p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
