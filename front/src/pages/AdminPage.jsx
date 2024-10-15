import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationHeader from '../components/Header';

function AdminPage() {
    const [activeTab, setActiveTab] = useState('users'); // Default active tab
    const [users, setUsers] = useState([]);
    const [publishers, setPublishers] = useState([]);
    const [ads, setAds] = useState([]);
    const [applications, setApplications] = useState([]);
    const [adminUsers, setAdminUsers] = useState([]); // New state for adminUsers
    const [editingItem, setEditingItem] = useState(null); // Holds the item being edited
    const [formData, setFormData] = useState({}); // Form data for editing
    const [showModal, setShowModal] = useState(false); // Modal visibility
    const [isAuthorized, setIsAuthorized] = useState(false); // Authorization state

    const navigate = useNavigate();

    // Check if the user is an admin
    useEffect(() => {
        const isAdmin = localStorage.getItem('isAdmin') === 'true'; // Ensure it's a boolean comparison
        if (!isAdmin) {
            // If not admin, redirect to login or show unauthorized message
            navigate("/login"); // Redirect to login
        } else {
            setIsAuthorized(true); // Set authorized state to true if admin
        }
    }, [navigate]);

    const fetchData = async (endpoint) => {
        try {
            const response = await fetch(`http://localhost:5001/api/${endpoint}`, {
                method: "GET",
                headers: {
                    "Authorization": `${localStorage.getItem('token')}`,  // Use token from localStorage
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                if (response.status === 401) {
                    navigate("/login");  // Redirect to login if unauthorized
                }
                throw new Error(`Failed to fetch ${endpoint}`);
            }

            const result = await response.json();
            switch (endpoint) {
                case 'users':
                    setUsers(result.users);
                    break;
                case 'publishers':
                    setPublishers(result.publishers);
                    break;
                case 'ads':
                    setAds(result.ads);
                    break;
                case 'apply':
                    setApplications(result.applications);
                    break;
                case 'admins':
                    setAdminUsers(result.admins);
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.error("Failed to fetch data:", error);
        }
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab); // Set the active tab
        fetchData(tab); // Fetch data for the selected tab
    };

    // Open the modal for editing an item
    const handleEditClick = (item) => {
        // Convert date fields to YYYY-MM-DD format for pre-filling
        const updatedItem = { ...item };

        // Check for keys that contain 'date' and format them to YYYY-MM-DD
        Object.keys(updatedItem).forEach(key => {
            if (key.includes('date') && updatedItem[key]) {
                updatedItem[key] = new Date(updatedItem[key]).toISOString().split('T')[0]; // Format the date
            }
        });

        setEditingItem(updatedItem);
        setFormData(updatedItem); // Pre-fill the form with current item data
        setShowModal(true); // Show the modal
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Submit the form to update the item
    const handleUpdate = async () => {
        const endpoint = activeTab;
        try {
            const response = await fetch(`http://localhost:5001/api/${endpoint}/${formData.id}`, {
                method: "PUT",
                headers: {
                    "Authorization": `${localStorage.getItem('token')}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to update item');
            }

            alert('Item updated successfully!');
            setShowModal(false); // Close the modal
            fetchData(endpoint); // Refresh the table
        } catch (error) {
            console.error('Failed to update item:', error);
        }
    };

    // Delete an item
    const handleDeleteClick = async (id) => {
        const endpoint = activeTab;
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                const response = await fetch(`http://localhost:5001/api/${endpoint}/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Authorization": `${localStorage.getItem('token')}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to delete item');
                }

                alert('Item deleted successfully!');
                fetchData(endpoint); // Refresh the table
            } catch (error) {
                console.error('Failed to delete item:', error);
            }
        }
    };

    const renderTable = (data, headers, keyOrder) => {
        return (
            <table className="table">
                <thead>
                    <tr>
                        {headers.map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            {keyOrder.map((key, idx) => (
                                <td key={idx}>{item[key]}</td>
                            ))}
                            <td>
                                <button className="btn btn-primary" style={{margin:'5px'}} onClick={() => handleEditClick(item)}>Edit</button>
                                <button className="btn btn-danger" onClick={() => handleDeleteClick(item.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    // If not authorized, show nothing or a loading spinner (as the check is async)
    if (!isAuthorized) {
        return null; // You can also return a loading spinner or redirect
    }

    return (
        <div>
            <NavigationHeader />

            <ul className="nav nav-tabs" style={{ fontSize: '20px', fontWeight: '10px' }}>
                <li className="nav-item">
                    <a
                        className={`nav-link ${activeTab === 'users' ? 'active' : ''}`}
                        onClick={() => handleTabClick('users')}
                    >
                        Users
                    </a>
                </li>
                <li className="nav-item">
                    <a
                        className={`nav-link ${activeTab === 'ads' ? 'active' : ''}`}
                        onClick={() => handleTabClick('ads')}
                    >
                        Ads
                    </a>
                </li>
                <li className="nav-item">
                    <a
                        className={`nav-link ${activeTab === 'apply' ? 'active' : ''}`}
                        onClick={() => handleTabClick('apply')}
                    >
                        Applications
                    </a>
                </li>
                <li className="nav-item">
                    <a
                        className={`nav-link ${activeTab === 'publishers' ? 'active' : ''}`}
                        onClick={() => handleTabClick('publishers')}
                    >
                        Publishers
                    </a>
                </li>
                <li className="nav-item">
                    <a
                        className={`nav-link ${activeTab === 'admins' ? 'active' : ''}`}  // Updated for consistency
                        onClick={() => handleTabClick('admins')}
                    >
                        Admin Users
                    </a>
                </li>
            </ul>

            <div className="tab-content mt-3">
                {activeTab === 'users' && renderTable(
                    users,
                    ['ID', 'Name', 'Last Name', 'Email', 'City', 'Country', 'Zipcode', 'Description', 'Birthdate', 'Title', 'Contact Information', 'Username'],
                    ['id', 'name', 'lastName', 'email', 'city', 'country', 'zipcode', 'description', 'birthdate', 'title', 'contactInformations', 'username']
                )}
                {activeTab === 'ads' && renderTable(
                    ads,
                    ['ID', 'Title', 'Wages', 'Description', 'Contact Information', 'Contract Type', 'Place', 'Working Schedules', 'Publication Date', 'Categories'],
                    ['id', 'title', 'wages', 'description', 'contactInformations', 'contractType', 'place', 'workingSchedules', 'publicationDate', 'categories']
                )}
                {activeTab === 'apply' && renderTable(
                    applications,
                    ['ID', 'Ad ID', 'Publisher ID', 'User ID', 'Name', 'Last Name', 'Email', 'Phone Number', 'City', 'Country', 'Zipcode', 'Message', 'Resume'],
                    ['id', 'adId', 'publisherId', 'userId', 'name', 'lastName', 'email', 'phoneNumber', 'city', 'country', 'zipcode', 'message', 'resume']
                )}
                {activeTab === 'publishers' && renderTable(
                    publishers,
                    ['ID', 'Name', 'Title', 'Place', 'Contact Information', 'Last Login Date', 'Signup Date'],
                    ['id', 'name', 'title', 'place', 'contactInformations', 'lastLoginDate', 'signupDate']
                )}
                {activeTab === 'admins' && renderTable(  // Updated to render Admin Users
                    adminUsers,
                    ['ID', 'Email'],
                    ['id', 'email']
                )}
            </div>

            {/* Modal for editing */}
            {showModal && (
                <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Item</h5>
                                <button type="button" className="close" onClick={() => setShowModal(false)}>&times;</button>
                            </div>
                            <div className="modal-body">
                                {/* Dynamic form based on activeTab */}
                                {Object.keys(formData).map((key) => (
                                    <div key={key} className="form-group">
                                        <label>{key}</label>
                                        {key.includes("date") ? (
                                            <input
                                                type="date"
                                                name={key}
                                                className="form-control"
                                                value={formData[key] ? formData[key].split('T')[0] : ''} // Ensure the format is YYYY-MM-DD
                                                onChange={handleInputChange}
                                            />
                                        ) : (
                                            <input
                                                type="text"
                                                name={key}
                                                className="form-control"
                                                value={formData[key] || ''}
                                                onChange={handleInputChange}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={handleUpdate}>Save changes</button>
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminPage;
