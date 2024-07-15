import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PublicRoute = ({ element }) => {
    const { isLoggedIn } = useAuth();

    return isLoggedIn ? <Navigate to="/dashboard" replace /> : element;
};

export default PublicRoute;
