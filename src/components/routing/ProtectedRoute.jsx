import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ element }) => {
    const { currentUser } = useAuth();
    if (!currentUser) {
        return <Navigate to="/login" />;
    }

    return element;
};

export default ProtectedRoute;
