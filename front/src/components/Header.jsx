import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/Logo.png';

const NavigationHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token'); // Make sure to remove the token as well
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand">
      <div className="container-fluid">
        {/* Logo in the center */}
        <div className="mx-auto text-center">
          <img
            src={logo}
            alt="Logo"
            style={{ width: '150px', height: 'auto' }}
          />
        </div>

        <ul className="nav nav-pills" style={{ marginTop: '25px', gap: '5px' }} role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              onClick={() => navigate('/')} // Navigate to home
              role="tab"
              style={{ backgroundColor: '#1178be', color: 'white' }}
              aria-selected="true">
              Home
            </button>
          </li>

          <li className="nav-item dropdown" role="presentation">
            <button
              className="nav-link dropdown-toggle"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ backgroundColor: '#1178be', color: 'white' }}>
              Profile
            </button>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => navigate('/profile')}>
                  Modify
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavigationHeader;
