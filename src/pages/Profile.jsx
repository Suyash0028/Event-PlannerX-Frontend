import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { updateProfile } from '../services/api'; // Assuming you have an API service for updating user profile
import Sidebar from '../components/Sidebar'; // Assuming you have a Sidebar component
import './Profile.css'; // Custom CSS for additional styling
import { toast } from 'react-toastify';

const Profile = () => {
    const { logout, currentUser } = useAuth(); // Assuming useAuth provides currentUser
    const [username, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        // Load current user details into form fields when component mounts
        if (currentUser) {
            setName(currentUser.username);
            setEmail(currentUser.email);
        }
    }, [currentUser]);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            const updatedUser = await updateProfile({ username, email });
            // Update currentUser with updatedUser from API if necessary
            toast.success('Profile updated successfully!');
        } catch (error) {
            toast.error('Failed to update profile. Please try again.');
        }
    };

    return (
        <div className="dashboard">
            <Sidebar />
            <div className="main-content">
                <Container>
                    <h2>Profile</h2>
                    <Form onSubmit={handleUpdateProfile}>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter name"
                                value={username}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="mt-3">
                            Update Profile
                        </Button>
                    </Form>
                </Container>
            </div>
        </div>
    );
};

export default Profile;
