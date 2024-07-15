import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css'; // Custom CSS for additional styling
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const isLandingPage = location.pathname === '/';
    const { currentUser } = useAuth();

    const handleScroll = () => {
        const offset = window.scrollY;
        if (offset > 50) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        // Update scrolled state based on current location
        if (isLandingPage && window.scrollY <= 50) {
            setScrolled(false);
        } else {
            setScrolled(true);
        }
    }, [location.pathname]);

    let navbarClasses = ['custom-navbar'];
    if (scrolled) {
        navbarClasses.push('scrolled');
    }

    return (
        <>
            {!currentUser ?
                <nav className={navbarClasses.join(' ')}>
                    <div className="custom-container">
                        <Link to="/" className="custom-navbar-brand">
                            Event-PlannerX
                        </Link>
                        <div className="custom-navbar-links">
                            <Link to="/" className="custom-nav-link">
                                Home
                            </Link>
                            <Link to="/login" className="custom-nav-link">
                                Login
                            </Link>
                            <Link to="/signup" className="custom-nav-link">
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </nav> : <></>}
        </>
    );
};

export default Navbar;
