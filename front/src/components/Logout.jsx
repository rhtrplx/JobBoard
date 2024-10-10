import React from "react";
import { useNavigate } from 'react-router-dom';
import Logout from "../assets/Logout.png";

function LogoutButton() {
  const navigate = useNavigate(); // useNavigate inside the component

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn'); // Remove the login state
    navigate("/login"); // Redirect to the login page
  };

  return (
    <div>
      {/* Logout icon (if you want to include it) */}
      <a className="Logout" href="/login">
        <img src={Logout} alt="Logout" width="40" height="40" />
      </a>
      
      {/* Logout button */}
      <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default LogoutButton;
