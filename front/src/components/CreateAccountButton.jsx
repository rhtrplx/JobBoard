import React from "react";
import { useNavigate } from 'react-router-dom';


function CreateAccountButton() {
    const navigate = useNavigate();

    const handleCreateAccount = () => {
        navigate("/home");
    };

    return(
    <button type="button" className="btn" style={{ backgroundColor: '#1178be', color: 'white' }} onClick={handleCreateAccount}>
    Create Account
    </button>
    );
}

export default CreateAccountButton;