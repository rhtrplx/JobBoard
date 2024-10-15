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
    const [editingItem, setEditingItem] = useState(null); // Holds the item being edited or added
    const [formData, setFormData] = useState({}); // Form data for editing or adding
    const [showModal, setShowModal] = useState(false); // Modal visibility
    const [isAuthorized, setIsAuthorized] = useState(false); // Authorization state
    const [isEditMode, setIsEditMode] = useState(false); // To determine if it's edit or add mode

    const navigate = useNavigate();

    // Check if the user is an admin
    useEffect(() => {
        const isAdmin = localStorage.getItem('isAdmin') === 'true'; // Ensure it's a boolean comparison
        if (!isAdmin) {
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
                    "Authorization": `${localStorage.getItem('token')}`,
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

    // Open the modal for editing an item
    const handleEditClick = (item) => {
        setIsEditMode(true); // Set mode to edit
        const updatedItem = { ...item };

        // Format date fields to YYYY-MM-DD format
        Object.keys(updatedItem).forEach(key => {
            if (key.toLowerCase().includes('date') && updatedItem[key]) {
                updatedItem[key] = new Date(updatedItem[key]).toISOString().split('T')[0];
            }
        });

        setEditingItem(updatedItem);
        setFormData(updatedItem); // Pre-fill the form with current item data
        setShowModal(true); // Show the modal
    };

    // Open the modal for adding a new item
    const handleAddClick = () => {
        setIsEditMode(false); // Set mode to add
        setFormData(getDefaultFormData()); // Set default form fields based on active tab
        setShowModal(true); // Show the modal
    };

    // Get default form data structure based on the current active tab
    const getDefaultFormData = () => {
        switch (activeTab) {
            case 'users':
                return {
                    name: '',
                    lastName: '',
                    email: '',
                    city: '',
                    country: '',
                    zipcode: '',
                    description: '',
                    birthdate: '', // Date field
                    title: '',
                    contactInformations: '',
                    username: '',
                    password: '', // Add password field for user creation
                };
            case 'ads':
                return {
                    title: '',
                    wages: '',
                    description: '',
                    contactInformations: '',
                    contractType: '',
                    place: '',
                    workingSchedules: '',
                    publicationDate: '', // Date field
                    categories: '',
                };
            case 'publishers':
                return {
                    name: '',
                    title: '',
                    place: '',
                    contactInformations: '',
                    lastLoginDate: '', // Date field
                    signupDate: '', // Date field
                };
            case 'apply':
                return {
                    adId: '',
                    publisherId: '',
                    userId: '',
                    name: '',
                    lastName: '',
                    email: '',
                    phoneNumber: '',
                    city: '',
                    country: '',
                    zipcode: '',
                    message: '',
                    resume: '',
                };
            case 'admins':
                return {
                    email: '',
                };
            default:
                return {};
        }
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Submit the form to update or add the item
    const handleSave = async () => {
        const endpoint = activeTab;
        const method = isEditMode ? "PUT" : "POST"; // Determine method based on mode
        const url = isEditMode
            ? `http://localhost:5001/api/${endpoint}/${formData.id}` // For updating existing item
            : `http://localhost:5001/api/${endpoint}`; // For creating a new item

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    "Authorization": `${localStorage.getItem('token')}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to save item');
            }

            alert(`Item ${isEditMode ? 'updated' : 'created'} successfully!`);
            setShowModal(false); // Close the modal
            fetchData(endpoint); // Refresh the table
        } catch (error) {
            console.error('Failed to save item:', error);
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
                                <button className="btn btn-primary" style={{ margin: '5px' }} onClick={() => handleEditClick(item)}>Edit</button>
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
                        className={`nav-link ${activeTab === 'admins' ? 'active' : ''}`}
                        onClick={() => handleTabClick('admins')}
                    >
                        Admin Users
                    </a>
                </li>
            </ul>

            <div className="d-flex justify-content-end mt-3">
                <button className="btn btn-success" onClick={handleAddClick}>
                    Add New Item
                </button>
            </div>

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
                {activeTab === 'admins' && renderTable(
                    adminUsers,
                    ['ID', 'Email'],
                    ['id', 'email']
                )}
            </div>

            {/* Modal for editing or adding */}
            {showModal && (
                <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{isEditMode ? 'Edit Item' : 'Add New Item'}</h5>
                                <button type="button" className="close" onClick={() => setShowModal(false)}>&times;</button>
                            </div>
                            <div className="modal-body">
                                {Object.keys(formData).map((key) => (
                                    <div key={key} className="form-group">
                                        <label>{key}</label>
                                        {key.toLowerCase().includes("date") ? (
                                            <input
                                                type="date"
                                                name={key}
                                                className="form-control"
                                                value={formData[key] || ''} // Ensure the format is YYYY-MM-DD
                                                onChange={handleInputChange}
                                            />
                                        ) : key === 'password' && !isEditMode ? (
                                            // Only show password field when adding a new user
                                            <input
                                                type="password"
                                                name={key}
                                                className="form-control"
                                                value={formData[key] || ''}
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
                                <button type="button" className="btn btn-primary" onClick={handleSave}>
                                    {isEditMode ? 'Save changes' : 'Create Item'}
                                </button>
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
