import React from 'react';
import { Link, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './UserDashboard.css';
import AllEvents from '../pages/AllEvents';
import MyEvents from '../pages/MyEvents';
import CreateEvent from '../pages/CreateEvent';
import Profile from '../pages/Profile';
import Sidebar from './Sidebar';

const UserDashboard = () => {

    return (
        <div className="dashboard">
            <Sidebar />
            <div className="main-content">
                <h1>Welcome to Your Dashboard</h1>
                <div className="dashboard-overview">
                    <div className="overview-card">
                        <h3>Total Events</h3>
                        <p>10</p>
                    </div>
                    <div className="overview-card">
                        <h3>Upcoming Events</h3>
                        <p>5</p>
                    </div>
                    <div className="overview-card">
                        <h3>Attended Events</h3>
                        <p>8</p>
                    </div>
                    <div className="overview-card">
                        <h3>Feedback Received</h3>
                        <p>20</p>
                    </div>
                </div>
                <div className="content">
                    <Routes>
                        <Route path="/my-events" element={<MyEvents />} />
                        <Route path="/all-events" element={<AllEvents />} />
                        <Route path="/create-event" element={<CreateEvent />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/" element={<Navigate to="/dashboard" />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
