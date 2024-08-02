import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PublicRoute = ({ element }) => {
    const { currentUser } = useAuth();
    return currentUser ? <Navigate to="/user-dashboard" replace /> : element;
};

export default PublicRoute;
