import React from "react";

function SubmitButton({ handleSubmit }) {
    return (
      <button 
        type="submit" 
        className="submit-button" 
        onClick={handleSubmit}
      >
        Log in
      </button>
    );
  }
  

export default SubmitButton;