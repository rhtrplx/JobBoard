import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProfilePhoto from "../assets/ProfilePhoto.png";
import './Style.css';
import NavigationHeader from '../components/Header';

function ProfilePage() {
    const [userData, setUserData] = useState({
        name: '',
        email: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/login'); // Redirect to home if no token
            return;
        }

        const fetchUserData = async () => {
            try {
                const response = await fetch("http://localhost:5001/api/users", {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}` // Include the token for authorization
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }

                const data = await response.json();
                setUserData(data);
            } catch (error) {
                console.error(error);
                setError("Could not fetch user data");
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [navigate]); // Add navigate as a dependency

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container-fluid">
            <NavigationHeader />
            <div className="row">
                <div className="col-md-4">
                    <div className="card d-flex justify-content-center">
                        <img src={ProfilePhoto} className="card-img-top" alt="Profile" />
                        <div className="card profilecontainer">
                            <h5 className="card-title">{userData.name}</h5>
                            <p className="card-text">
                                Hi! My name is {userData.name}. You can contact me at {userData.email}.
                            </p>
                        </div>
                    </div>
                </div>
                {/* Additional sections can be added here */}
            </div>
        </div>
    );
}

export default ProfilePage;
