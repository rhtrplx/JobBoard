import React from 'react';
import { useNavigate } from 'react-router-dom';

const ApplyNowButton = () => {
  const navigate = useNavigate();

  const handleApplyNowClick = () => {
    const token = localStorage.getItem('token'); // Check if token exists
    if (token) {
      // If logged in, navigate to the application form with the token
      navigate('/applicationform');
    } else {
      // If not logged in, navigate to the application form (no token)
      navigate('/applicationform');
    }
  };

  return (
    <button className="ApplyNow" onClick={handleApplyNowClick}>
      Apply Now!
    </button>
  );
};

export default ApplyNowButton;
