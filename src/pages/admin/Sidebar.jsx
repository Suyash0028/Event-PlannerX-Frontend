import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaUserEdit, FaCalendarAlt, FaUser, FaSignOutAlt } from 'react-icons/fa';
import './Sidebar.css';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
    const { logout } = useAuth();
    return (
        <div className="admin-sidebar">
            <nav>
                <ul>
                    <li>
                        <NavLink to="/admin-dashboard" activeClassName="active">
                            <FaTachometerAlt />
                            <span className="link-text">Admin Dashboard</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/user-dashboard" activeClassName="active">
                            <FaTachometerAlt />
                            <span className="link-text">User Dashboard</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/users" activeClassName="active">
                            <FaUser />
                            <span className="link-text">Users</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/events" activeClassName="active">
                            <FaCalendarAlt />
                            <span className="link-text">Events</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <button className="logout-button" onClick={logout}>
                <FaSignOutAlt />
                <span className="link-text">Logout</span>
            </button>
        </div>
    );
};

export default Sidebar;
