import React from 'react';
import { useNavigate } from 'react-router-dom';

const ApplyNowButton = ({ jobData }) => {
  const navigate = useNavigate();

  const handleApplyNowClick = () => {
    const token = localStorage.getItem('token'); // Check if token exists
    if (token) {
      // If logged in, navigate to the application form with the job data
      navigate('/applicationform', { state: { jobData } });
    } else {
      // If not logged in, still navigate to the application form (no token)
      navigate('/applicationform', { state: { jobData } });
    }
  };

  return (
    <button
      className="ApplyNow"
      style={{
        backgroundColor: '#cee6fa',
        borderColor: '#6babe0',
        color: 'black',
        margin: '5px',
        borderRadius: '5px',
      }}
      onClick={handleApplyNowClick}
    >
      Apply Now!
    </button>
  );
};

export default ApplyNowButton;
