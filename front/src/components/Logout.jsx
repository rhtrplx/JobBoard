import React from "react";
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from localStorage
    localStorage.removeItem('user'); 
    navigate("/"); // Redirect to the login page
    alert('loggedout!')
  };

  return (
    <div>
      {/* Logout button */}
      <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default LogoutButton;
