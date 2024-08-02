import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaCalendarDay, FaPlusCircle, FaUser, FaSignOutAlt, FaList } from 'react-icons/fa';
import './Sidebar.css';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
    const { logout } = useAuth();
  return (
    <div className="sidebar">
      <nav>
        <ul>
          <li>
            <NavLink to="/user-dashboard" activeClassName="active">
              <FaTachometerAlt />
              <span className="link-text">Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/myevents" activeClassName="active">
              <FaCalendarDay />
              <span className="link-text">My Events</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/create-event" activeClassName="active">
              <FaPlusCircle />
              <span className="link-text">Create Event</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/allevents" activeClassName="active">
              <FaList />
              <span className="link-text">All Events</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile" activeClassName="active">
              <FaUser />
              <span className="link-text">Profile</span>
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
