import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/Logo.png';

const NavigationHeader = () => {
  const navigate = useNavigate();

  // State to manage the visibility of the dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token'); // Make sure to remove the token as well
    navigate("/login");
  };

  // Toggle the dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Logo in the center with subtle hover effect */}
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

        {/* Navigation Links */}
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
              onClick={toggleDropdown} // Toggle dropdown on click
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

            {/* Dropdown Menu - Show/hide based on isDropdownOpen */}
            {isDropdownOpen && (
              <ul className="dropdown-menu show" aria-labelledby="profileDropdown" style={dropdownStyles}>
                <li>
                  <button className="dropdown-item" onClick={() => navigate('/profile')} style={dropdownItemStyles}>
                    Modify Profile
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={() => navigate('/settings')} style={dropdownItemStyles}>
                    Settings
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={() => navigate('/notifications')} style={dropdownItemStyles}>
                    Notifications
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
  );
};

// Dropdown styles with right alignment fix
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
  right: 0, // Align the dropdown to the right of the parent button
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
