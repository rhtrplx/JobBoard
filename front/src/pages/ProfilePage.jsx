import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProfilePhoto from "../assets/ProfilePhoto.png";
import './Style.css';
import NavigationHeader from '../components/Header';

function ProfilePage() {
    const [userData, setUserData] = useState({
        name: localStorage.getItem('username') || '', // Get username from localStorage
        email: localStorage.getItem('email') || ''
    });
    const [loading, setLoading] = useState(true); // State to manage loading state
    const [error, setError] = useState(null); // State to handle errors

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError("No user is logged in");
            setLoading(false);
            return;
        }

        const fetchUserData = async () => {
            try {
                const response = await fetch("http://localhost:5001/api/users", {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}` // Include token for authorization
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }

                const data = await response.json();
                setUserData((prevData) => ({
                    ...prevData,
                    ...data // Merge fetched data with existing state
                }));
            } catch (error) {
                console.error(error);
                setError("Could not fetch user data");
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchUserData();
    }, []); // Dependency array is empty to run only once on mount

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
                    <div className="card d-flex justify-content-center">
                        <img src={ProfilePhoto} className="card-img-top" alt="Profile Logo" />
                        <div className="card profilecontainer">
                            <h5 className="card-title">{`${userData.name}`}</h5>
                            <p className="card-text">
                                Hi! My name is {userData.name || "..."}. You can contact me at {userData.email || "..."}.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="row">
                        <div className="col-12 mb-3">
                            <div className="Saved">Saved</div>
                        </div>
                        <div className="col-12 mb-3">
                            <div className="Notes">Notes</div>
                        </div>
                    </div>
                </div>
            </div>
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
