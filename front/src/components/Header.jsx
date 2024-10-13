import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/Logo.png';

const NavigationHeader = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false); // State to control the alert visibility

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    setShowAlert(true); // Show the alert when logged out
    setTimeout(() => {
      setShowAlert(false); // Hide the alert after 3 seconds
      navigate("/"); // Redirect after showing alert
    }, 1000);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <div className="logo-container mx-auto">
            <img
              src={logo}
              alt="Logo"
              className="logo"
              style={{
                width: '100px',
                transition: 'transform 0.3s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            />
          </div>

          <ul className="nav nav-pills" style={{ gap: '20px', margin: '0' }}>
            <li className="nav-item">
              <button
                className="nav-link active"
                onClick={() => navigate('/')}
                style={{
                  backgroundColor: 'transparent',
                  color: '#1178be',
                  fontWeight: '600',
                  border: '2px solid #1178be',
                  borderRadius: '20px',
                  padding: '10px 20px',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#1178be';
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#1178be';
                }}
              >
                Home
              </button>
            </li>

            <li className="nav-item dropdown" style={{ position: 'relative' }}>
              <button
                className="nav-link dropdown-toggle"
                id="profileDropdown"
                onClick={toggleDropdown}
                style={{
                  backgroundColor: '#1178be',
                  color: '#fff',
                  fontWeight: '600',
                  border: 'none',
                  borderRadius: '20px',
                  padding: '10px 20px',
                  transition: 'background-color 0.3s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0d5a9b'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1178be'}
              >
                Profile
              </button>

              {isDropdownOpen && (
                <ul className="dropdown-menu show" aria-labelledby="profileDropdown" style={dropdownStyles}>
                  <li>
                    <button className="dropdown-item" onClick={() => navigate('/profile')} style={dropdownItemStyles}>
                      Account
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={() => navigate('/modify')} style={dropdownItemStyles}>
                      Modify
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={() => navigate('/settings')} style={dropdownItemStyles}>
                      Settings
                    </button>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogout} style={dropdownItemStyles}>
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>
      </nav>

      {/* Alert to be displayed after logout */}
      {showAlert && (
        <div className="alert alert-info" role="alert" style={{ position: 'fixed', top: '10px', right:'20%',width: '20%', textAlign: 'center', alignContent: 'center'}}>
          Log out successful!
        </div>
      )}
    </>
  );
};

// Dropdown styles
const dropdownStyles = {
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  padding: '10px 0',
  marginTop: '10px',
  transition: 'opacity 0.3s ease, transform 0.3s ease',
  transform: 'translateY(0)',
  opacity: 1,
  zIndex: 1000,
  position: 'absolute',
  right: 0,
};

// Dropdown item styles
const dropdownItemStyles = {
  padding: '10px 20px',
  fontSize: '16px',
  fontWeight: '500',
  color: '#333',
  transition: 'background-color 0.2s ease',
};

export default NavigationHeader;
