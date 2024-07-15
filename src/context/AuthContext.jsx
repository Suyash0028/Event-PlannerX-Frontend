// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchCurrentUser } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const login = async (token) => {
        localStorage.setItem('token', token);
        const data = await fetchCurrentUser();
        setCurrentUser(data);
        localStorage.setItem('user', JSON.stringify(data));
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setCurrentUser(null);
    };

    const getCurrentUser = async () => {
        try {
            const data = await fetchCurrentUser();
            setCurrentUser(data);
            localStorage.setItem('user', JSON.stringify(data));
        } catch (error) {
            console.error('Failed to fetch current user:', error);
            setCurrentUser(null);
        }
    };
    

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            getCurrentUser();
        } else {
            setCurrentUser(null);
        }
    }, []);    

    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
