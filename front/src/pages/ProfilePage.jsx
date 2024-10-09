import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import bear from "../assets/bear.png";
import './Style.css';
import logo from "../assets/Logo.png";
import ProfileLogo from "../assets/ProfileLogo.png"
import HomeLogo from "../assets/HomeLogo.png"

function ProfilePage() {
    return (
        <div className="container mt-4">
            {/* Header */}
            <div className="row">
                <header>
                    <div className="HeaderContainer d-flex justify-content-center align-items-center position-relative">
                        {/* Main logo centered */}
                        <a className="Logo">
                            <img src={logo} alt="Logo" width="100" height="100" />
                        </a>

                        {/* Profile logo on the left */}
                        <a className="HomeLogo" href="/home">
                            <img src={HomeLogo} alt="Profile Logo" width="40" height="40" />
                        </a>
                    </div>
                </header>
            </div>

            {/* Main content */}
            <div className="row">
                {/* Card as the red block */}
                <div className="col-md-4 mb-3">
                    <div className="card bg text-black" style={{ width: "26rem", height: '300px' }}>
                        <img src={bear} className="card-img-top" alt="Profile Logo" style={{ height: '150px', objectFit: 'cover' }} />
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">
                                Some quick example text to build on the card title and make up the bulk of the card's content.
                            </p>
                            <a href="/home" className="btn btn-light">Go to Home</a>
                        </div>
                    </div>
                </div>

                {/* Green and yellow blocks */}
                <div className="col-md-8">
                    <div className="row">
                        <div className="col-12 mb-3">
                            <div className="bg-success" style={{ height: '150px' }}></div>
                        </div>
                        <div className="col-12 mb-3">
                            <div className="bg-warning" style={{ height: '150px' }}></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Light blue and purple blocks */}
            <div className="row">
                <div className="col-md-6 mb-3">
                    <div className="bg-info" style={{ height: '150px' }}></div>
                </div>
                <div className="col-md-6 mb-3">
                    <div className="bg-secondary" style={{ height: '150px' }}></div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;






