import React from "react";


function SubmitButton({handleSubmit, email, password}) {

    return(
    <button type="submit" className="btn" style={{ backgroundColor: '#1178be', color: 'white' }} onClick={handleSubmit}>
    Submit
    </button>
    );
}

export default SubmitButton;