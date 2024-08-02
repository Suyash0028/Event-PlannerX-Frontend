import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchCurrentUser } from '../services/api';
import { getItemWithExpiry, setItemWithExpiry } from '../services/localStorageService';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(() => {
        const storedUser = getItemWithExpiry('user');
        return storedUser; 
    });

    const login = async (token) => {
        setItemWithExpiry('token', token, 3600000);
        const data = await fetchCurrentUser();
        setCurrentUser(data);
        setItemWithExpiry('user', data, 3600000);
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
            setItemWithExpiry('user', data, 3600000);
        } catch (error) {
            console.error('Failed to fetch current user:', error);
            setCurrentUser(null);
        }
    };
    

    useEffect(() => {
        const token = getItemWithExpiry('token');
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
