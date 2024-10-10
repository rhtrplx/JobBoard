import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProfilePhoto from "../assets/ProfilePhoto.png";
import './Style.css';
import logo from "../assets/Logo.png";
import ProfileLogo from "../assets/ProfileLogo.png";
import HomeLogo from "../assets/HomeLogo.png";

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
                        <a className="HomeLogo" href="/">
                            <img src={HomeLogo} alt="Profile Logo" width="40" height="40" />
                        </a>
                    </div>
                </header>
            </div>

            {/* Main content */}
            <div className="row">
                {/* Profile Photo */}

                <div className="col-md-4">
                    <div className="card d-flex justify-content-center">
                        <img src={ProfilePhoto} className="card-img-top" alt="Profile Logo" />
                        <div className="card profilecontainer">
                            <h5 className="card-title">Name Last Name</h5>
                            <p className="card-text">
                                Hi! , My name is......
                            </p>
                        </div>
                    </div>
                </div>

                {/* Green and yellow blocks */}
                <div className="col-md-8">
                        <div className="row">
                            <div className="col-12 mb-3">
                                <div className="Saved">Saved</div>
                            </div>
                            <div className="col-12 mb-3">
                                <div className="Notes">
                                    Notes
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            {/* Light blue and purple blocks */}
            <div className="row">
                <div className="col-md-6 mb-3">
                    <div className="Reminders border border-dark" style={{ height: '150px' }}>Reminders</div>
                </div>
                <div className="col-md-6 mb-3">
                    <div className="calendar border border-black" style={{ height: '150px' }}>Calendar</div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
