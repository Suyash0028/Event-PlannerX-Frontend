// src/components/Sidebar.jsx

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Sidebar.css';

const Sidebar = () => {
    const { pathname } = useLocation();
    const { logout } = useAuth();

    return (
        <div className="sidebar">
            <Link to="/dashboard" className={`sidebar-link ${pathname === '/dashboard' ? 'active' : ''}`}>Dashboard</Link>
            <Link to="/my-events" className={`sidebar-link ${pathname === '/my-events' ? 'active' : ''}`}>My Events</Link>
            <Link to="/all-events" className={`sidebar-link ${pathname === '/all-events' ? 'active' : ''}`}>All Events</Link>
            <Link to="/create-event" className={`sidebar-link ${pathname === '/create-event' ? 'active' : ''}`}>Create Event</Link>
            <Link to="/profile" className={`sidebar-link ${pathname === '/profile' ? 'active' : ''}`}>Profile</Link>
            <button onClick={logout} className="btn btn-danger sidebar-link">Logout</button>
        </div>
    );
};

export default Sidebar;
