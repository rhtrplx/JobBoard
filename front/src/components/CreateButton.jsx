import React from "react";


function CreateButton({handleCreate}) {

    return(
    <button type="submit" className="btn" style={{ backgroundColor: '#1178be', color: 'white' }} onClick>
    Create an Account
    </button>
    );
}

export default CreateButton;