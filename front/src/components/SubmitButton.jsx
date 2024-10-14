import React from "react";

function SubmitButton({handleSubmit}) {
    return(
    <button type="submit" className="btn" style={{ backgroundColor: '#1178be', color: 'white' }}>
    Log in
    </button>
    
    );
}

export default SubmitButton;