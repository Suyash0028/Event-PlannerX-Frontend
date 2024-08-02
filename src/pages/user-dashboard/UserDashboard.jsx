import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import './UserDashboard.css';
import Profile from '../Profile';
import Sidebar from '../../components/sidebar/Sidebar';
import MyEvents from '../events/MyEvents';
import AllEvents from '../events/AllEvents';
import CreateEvent from '../events/CreateEvent';
import { Container } from 'react-bootstrap';

const UserDashboard = () => {

    return (
        <div className="dashboard">
            <Sidebar />
            <div className="main-content">
                <Container>
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
                            <Route path="/myevents" element={<MyEvents />} />
                            <Route path="/allevents" element={<AllEvents />} />
                            <Route path="/create-event" element={<CreateEvent />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/" element={<Navigate to="/user-dashboard" />} />
                        </Routes>
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default UserDashboard;
