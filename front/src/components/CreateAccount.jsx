import React from "react";
import { useNavigate } from 'react-router-dom';

function CreateButton() {
  const navigate = useNavigate();

  const handleCreate = () => {
    navigate("/create");
  };

  return (
    <button 
      type="button" 
      className="create-button" 
      onClick={handleCreate}
    >
      Create an Account
    </button>
  );
}

export default CreateButton;
