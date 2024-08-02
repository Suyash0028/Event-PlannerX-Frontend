import React, { useEffect, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserById, updateUser } from '../../services/api';
import './EditUser.css';
import Sidebar from './Sidebar';

const EditUser = () => {
    const { userId } = useParams();
    const [user, setUser] = useState({});
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const data = await getUserById(userId);
            setUser(data);
            setUsername(data.username);
            setEmail(data.email);
            setIsAdmin(data.isAdmin);
        };

        fetchUser();
    }, [userId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateUser(userId, { username, email, isAdmin });
            navigate('/admin/users'); 
        } catch (error) {
            console.error('Failed to update user:', error);
        }
    };

    return (
        <div className="dashboard">
            <Sidebar />
            <div className="main-content">
                <Container>
                    <div className="profile-card">
                        <h2>Edit User</h2>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formIsAdmin">
                                <Form.Check
                                    type="checkbox"
                                    label="Admin"
                                    checked={isAdmin}
                                    onChange={(e) => setIsAdmin(e.target.checked)}
                                />
                            </Form.Group>

                            <Button variant="primary" type="submit" className="mt-3">
                                Save Changes
                            </Button>
                        </Form>
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default EditUser;
