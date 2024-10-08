import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from "../assets/Logo.png";
import ProfileLogo from "../assets/ProfileLogo.png"
import './Style.css';

function HomePage() {
  // State to track which job card is expanded
  const [expanded, setExpanded] = useState(null);

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id); // Toggle between expanded and collapsed
  };

  return (
    <div className="container-fluid">
      {/* Header */}
      <header>
        <div className="HeaderContainer">
          <a className="Logo">
            <img src={logo} alt="Logo" width="100" height="100" />
          </a>

          <a className="ProfileLogo" href="/profile">
            <img src={ProfileLogo} alt="Logo" width="40" height="40" />
          </a>
        </div>


      </header>

      {/* Main Content Area: Menu and Page */}
      <div className="row" style={{ minHeight: '80vh' }}>
        {/* Menu */}
        <nav className="col-md-3 bg-light text-black p-4">
        <h2>Filters</h2>
        {/* Add menu items here */}
        <div>
        <input type="text" />
        <button id='filtersubmitbutton'>submit</button>
        </div>
        
        <div>
        <div class="btn-group" role="group" aria-label="Basic example">
        <button type="button" class="btn btn" className='filterbutton'>CDI</button>
         <button type="button" class="btn btn" className='filterbutton'>CDD</button>
        <button type="button" class="btn btn" className='filterbutton'>Alternance</button>
        </div>
        </div>
        
        </nav>







        {/* Page Content */}
        <main className="col-md-9 bg-white text-black p-4" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
          <h2>Jobs</h2>

          {/* Job Cards */}
          {[...Array(10)].map((_, index) => ( // Simulate multiple job cards
            <div className="card mb-3" key={index}>
              <div className="card-body">
                <h5 className="card-title">Job {index + 1}</h5>
                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                <a
                  href="#"
                  className="btn btn-primary"
                  onClick={() => toggleExpand(index + 1)} // Toggle details for card
                >
                  Learn More
                </a>

                {/* Collapsible content */}
                {expanded === index + 1 && (
                  <div className="mt-3">
                    <p>Here are more details about the job...</p>
                    <p>Job requirements, qualifications, salary, etc.</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </main>
      </div>

      {/* Footer */}
      <footer className="row text-black text-center p-4" style={{ backgroundColor: '#B9D9EB' }}>
        <div className="col">
          <p>Footer Content</p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
