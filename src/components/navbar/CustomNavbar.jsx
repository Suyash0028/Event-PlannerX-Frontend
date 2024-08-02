import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './CustomNavbar.css';
import { useAuth } from '../../context/AuthContext';
import logo from '/Event-PlannerX-logo.png';
import { Navbar, Nav, Container } from 'react-bootstrap';

const CustomNavbar = () => {
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
        if (isLandingPage && window.scrollY <= 50) {
            setScrolled(false);
        } else {
            setScrolled(true);
        }
    }, [location.pathname]);

    let navbarClasses = ['custom-navbar'];
    if (scrolled || !isLandingPage) {
        navbarClasses.push('scrolled');
    }

    return (
        <>
            {!currentUser && (
                <Navbar className={navbarClasses.join(' ')} expand="lg" fixed='top'>
                    <Container className="custom-container">
                        <Navbar.Brand as={Link} to="/" className="custom-navbar-brand">
                            <img src={logo} alt="Event-PlannerX Logo" className="logo" />
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ml-auto custom-navbar-links">
                                <Nav.Link as={Link} to="/" className="custom-nav-link">Home</Nav.Link>
                                <Nav.Link as={Link} to="/login" className="custom-nav-link">Login</Nav.Link>
                                <Nav.Link as={Link} to="/signup" className="custom-nav-link">Sign Up</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            )}
        </>
    );
};

export default CustomNavbar;
