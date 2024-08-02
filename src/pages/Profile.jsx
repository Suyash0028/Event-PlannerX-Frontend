import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { updateProfile } from '../services/api';
import './Profile.css';
import { toast } from 'react-toastify';
import Sidebar from '../components/sidebar/Sidebar';
import Spinner from '../components/spinner/Spinner';

const Profile = () => {
    const { currentUser } = useAuth();
    const [username, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (currentUser) {
            setName(currentUser.username);
            setEmail(currentUser.email);
        }
    }, [currentUser]);

    if(!currentUser){
        return <Spinner />;
    }
    
    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            const updatedUser = await updateProfile({ username, email });
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
                    <div className="profile-card">
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
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default Profile;
