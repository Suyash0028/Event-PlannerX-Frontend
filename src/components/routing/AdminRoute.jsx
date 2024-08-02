import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminRoute = ({ element }) => {
    const { currentUser } = useAuth();

    if (!currentUser) {
        return <Navigate to="/login" />;
    }

    if (!currentUser.isAdmin) {
        return <Navigate to="/user-dashboard" />;
    }

    return element;
};

export default AdminRoute;
