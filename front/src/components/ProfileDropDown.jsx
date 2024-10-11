import React from "react";
import { useNavigate } from 'react-router-dom';
import Logout from "../assets/Logout.png"; // Make sure to import the Logout image if you're using it

const ProfileDropdown = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn'); // Remove the login state
    localStorage.removeItem('token'); // Also remove the token
    navigate("/login"); // Redirect to the login page
  };

  const handleModify = () => {
    navigate("/modify"); // Navigate to modify page
  };

  return (
    <div className="dropdown">
      <button className="btn btn-secondary dropdown-toggle" type="button" id="profileDropdown" data-bs-toggle="dropdown" aria-expanded="false">
        Profile
      </button>
      <ul className="dropdown-menu" aria-labelledby="profileDropdown">
        <li>
          <button className="dropdown-item" onClick={handleModify}>
            Modify
          </button>
        </li>
        <li>
          <button className="dropdown-item" onClick={handleLogout}>
            <img src={Logout} alt="Logout" width="20" height="20" style={{ marginRight: '5px' }} />
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ProfileDropdown;
