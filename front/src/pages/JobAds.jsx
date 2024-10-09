import React, { useEffect, useState } from 'react';

const JobAds = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);
  const page = 0; // Set your desired page number here

  // Fetch job ads from the server
  const fetchAds = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/ads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ "page": page }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setAds(data.ads);
    } catch (error) {
      console.error('Error fetching ads:', error);
    } finally {
      setLoading(false);
    }
  };

  // Toggle the expanded state of a job card
  const toggleExpand = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  useEffect(() => {
    fetchAds();
  }, []); // Fetch ads on component mount

  return (
    <main className="col-md-9 bg-white text-black p-4" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
      <h2>Jobs</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        ads.map((ad, index) => (
          <div className="card mb-3" key={ad.id}>
            <div className="card-body">
              <h5 className="card-title">{ad.title}</h5>
              <p className="card-text">{ad.description}</p>
              <p className="card-text"><strong>Wages:</strong> {ad.wages}</p>
              <p className="card-text"><strong>Location:</strong> {ad.place}</p>
              <p className="card-text"><strong>Working Schedules:</strong> {ad.workingSchedules}</p>
              <a
                href="#"
                className="btn btn-primary"
                onClick={() => toggleExpand(index + 1)}
              >
                Learn More
              </a>

              {/* Collapsible content */}
              {expanded === index + 1 && (
                <div className="mt-3">
                  <p>Contact: {ad.contactInformations}</p>
                  <p>Contract Type: {ad.contractType}</p>
                  <p>Publication Date: {ad.publicationDate}</p>
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </main>
  );
};

export default JobAds;
