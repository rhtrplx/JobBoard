import React from "react";

function CreateAccountButton({ onClick }) {
    return (
        <button type="submit" className="btn" style={{ backgroundColor: '#1178be', color: 'white' }} onClick={onClick}>
            Create Account
        </button>
    );
}

export default CreateAccountButton;
