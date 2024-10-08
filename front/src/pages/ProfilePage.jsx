import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import bear from "../assets/bear.png";
import './Style.css';

function ProfilePage() {
    return (
        <div className="profile_container">
            <div className="card" style={{ width: "18rem" }}>
                <img src={bear} className="card-img-top" alt="Profile Logo" />
                <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">
                        Some quick example text to build on the card title and make up the bulk of the card's content.
                    </p>
                    <a href="/home" className="btn btn-primary">Home</a>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
