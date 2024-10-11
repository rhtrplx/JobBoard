import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { useNavigate } from 'react-router-dom';
import logo from '../assets/Logo.png';

const NavigationHeader = () => {
  const navigate = useNavigate();

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

        <ul className="nav nav-pills" style={{ marginTop: '25px', gap:'5px'}} role="tablist">
          <li className="nav-item" role="presentation">
            <button 
              className="nav-link active" 
              onClick={() => navigate('/')} // Navigate to home
              role="tab" 
              style={{backgroundColor: '#0A66C2', color:'white'}}
              aria-selected="true">
              Home
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button 
              className="nav-link" 
              onClick={() => navigate('/profile')} // Navigate to profile
              role="tab" 
              style={{backgroundColor: '#0A66C2', color:'white'}}
              aria-selected="false">
              Profile
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button 
              className="nav-link" 
              onClick={() => navigate('/login')} // Navigate to login
              role="tab" 
              style={{backgroundColor: '#0A66C2', color:'white'}}
              aria-selected="false">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavigationHeader;
