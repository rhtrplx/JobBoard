import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProfilePhoto from "../assets/ProfilePhoto.png";
import './Style.css';
import NavigationHeader from '../components/Header';
import { useNavigate } from 'react-router-dom';

function ProfilePage() {
    const [userData, setUserData] = useState({
        name: '',
        lastname: '',
        email: '',
        description: '',
        title: ''
    });
    const [loading, setLoading] = useState(true); // State to manage loading state
    const [error, setError] = useState(null); // State to handle errors
    const navigate = useNavigate(); // Define navigate using useNavigate hook

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setLoading(false); // Set loading to false
            navigate('/login'); // Redirect to login page if token is not found
            return; // Stop execution here to avoid calling the fetch function
        }

        const fetchUserData = async () => {
            try {
                const response = await fetch("http://localhost:5001/api/users", {
                    method: 'GET',
                    headers: {
                        'Authorization': `${token}`, // Include token for authorization
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }

                const data = await response.json();
                setUserData({
                    name: data.user.name || '',
                    lastname: data.user.lastname || '',
                    email: data.user.email || '',
                    description: data.user.description || '',
                    title: data.user.title || ''
                });
            } catch (error) {
                console.error(error);
                setError("Could not fetch user data");
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchUserData();
    }, [navigate]); // Dependency array includes 'navigate'

    if (loading) {
        return <div>Loading...</div>; // Show loading message
    }

    if (error) {
        return <div>{error}</div>; // Display error message if there is one
    }

    return (
        <div className="container-fluid">
            <NavigationHeader />
            <div className="row">
                <div className="col-md-4">
                    <div className="card profilecard d-flex justify-content-center align-items-center mb-3" style={{ height: '100%', borderStyle: 'dotted' }}>
                        <img src={ProfilePhoto} className="card-img-center" alt="Profile Logo" style={{ width: '200px', height: '200px', objectFit: 'cover' }} />
                        <div className="card-body">
                            <h5 className="card-title d-flex justify-content-center align-items-center">{`${userData.name}`}</h5>
                            <h5 className="card-title d-flex justify-content-center align-items-center">{`${userData.title}`}</h5>
                            <p className="card-text d-flex justify-content-center align-items-center">
                                {userData.name || "..."}.
                            </p>
                            <p className="card-text d-flex justify-content-center align-items-center">
                                {userData.description || "..."}.
                            </p>
                            <p className="card-text d-flex justify-content-center align-items-center">
                                {userData.email || "..."}.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="row">
                        <div className="col-12 mb-3" style={{ height: '100%' }}>
                            <div className="card">
                                <div className="card-header" style={{ backgroundColor: '#386fa4', color: 'white' }}>Saved Ads:</div>
                                <div className="card-body">
                                    <p>No saved ads yet.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 mb-3">
                            <div className="card">
                                <div className="card-header" style={{ backgroundColor: '#386fa4', color: 'white' }}>Notes:</div>
                                <div className="card-body d-flex flex-column" style={{ height: '100%' }}>
                                    <textarea
                                        className="form-control"
                                        style={{ flex: 1 }}
                                        placeholder="Write your notes here..."
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-12 mb-3">
                            <div className="card" style={{ height: '100%' }}>
                                <div className="card-header" style={{ backgroundColor: '#386fa4', color: 'white' }}>Reminders</div>
                                <div className="card-body">You are doing great! Keep on going.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
