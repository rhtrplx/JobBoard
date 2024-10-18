import React from "react";
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); // Clear all localStorage items
    navigate("/login"); // Redirect to the login page
    alert('Logged out!');
  };

  return (
    <div>
      {/* Logout button */}
      <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default LogoutButton;
