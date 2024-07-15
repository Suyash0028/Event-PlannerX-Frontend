import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
    const { currentUser } = useAuth();
    console.log("2");
    if (!currentUser) {
        return <Navigate to="/login" />;
    }

    return element;
};

export default ProtectedRoute;
