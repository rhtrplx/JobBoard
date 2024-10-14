import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationHeader from '../components/Header';

function AdminPage() {
    const [activeTab, setActiveTab] = useState('users'); // Default active tab
    const [users, setUsers] = useState([]);
    const [publishers, setPublishers] = useState([]);
    const [ads, setAds] = useState([]);
    const [applications, setApplications] = useState([]);

    const fetchData = async (endpoint) => {
        try {
            const response = await fetch(`http://localhost:5001/api/${endpoint}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            switch (endpoint) {
                case 'users':
                    setUsers(result);
                    break;
                case 'publishers':
                    setPublishers(result);
                    break;
                case 'ads':
                    setAds(result);
                    break;
                case 'apply':
                    setApplications(result);
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

    const renderTable = (data, headers) => {
        return (
            <table className="table">
                <thead>
                    <tr>
                        {headers.map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            {Object.values(item).map((value, index) => (
                                <td key={index}>{value}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    return (
        <div>
            <NavigationHeader />

            <ul className="nav nav-tabs" style={{fontSize:'20px', fontWeight:'10px'}}>
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
            </ul>

            <div className="tab-content mt-3">
                {activeTab === 'users' && renderTable(users, ['ID', 'Name', 'Email'])}
                {activeTab === 'ads' && renderTable(ads, ['ID', 'Title', 'Description', 'Contract Type'])}
                {activeTab === 'apply' && renderTable(applications, ['ID', 'User ID', 'Ad ID', 'Status'])}
                {activeTab === 'publishers' && renderTable(publishers, ['ID', 'Name', 'Website'])}
            </div>
        </div>
    );
}

export default AdminPage;
