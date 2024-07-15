import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        const storedLoggedIn = localStorage.getItem('isLoggedIn');
        return storedLoggedIn ? JSON.parse(storedLoggedIn) : false;
    });

    const login = () => {
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', JSON.stringify(true));
    };

    const logout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('token');
    };

    useEffect(() => {
        const storedLoggedIn = localStorage.getItem('isLoggedIn');
        if (storedLoggedIn) {
            setIsLoggedIn(JSON.parse(storedLoggedIn));
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
