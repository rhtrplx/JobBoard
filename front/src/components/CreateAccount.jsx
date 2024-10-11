import React from "react";
import { useNavigate } from 'react-router-dom';


function CreateButton() {
    const navigate = useNavigate();

    const handleCreate = () => {
        navigate("/create");
    };

    return(
    <button type="button" className="btn" style={{
        backgroundColor: '#0A66C2',
        borderColor: '#0A66C2',
        color: 'white',
        margin: '5px',
        borderRadius: '5px'
      }}  onClick={handleCreate}>
    Create an Account
    </button>
    );
}

export default CreateButton;