import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { loginUser } from '../../services/api';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import './AuthPage.css';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const result = await loginUser({ email, password });
            if (result) {
                await login(result.token);
                toast.success('Login successful!');
                result.user.isAdmin ? navigate('/admin-dashboard') : navigate('/user-dashboard');
            } else {
                toast.error('Login failed. Please check your credentials.');
            }
        } catch (error) {
            toast.error('Login failed. Please try again.');
        }
    };

    return (
        <Container className="auth-page">
            <div className="auth-container">
                <div className="message-section d-flex flex-column justify-content-center">
                    <motion.div
                        initial={{ x: 200, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2>Welcome Back!</h2>
                        <p>Login to continue.</p>
                    </motion.div>
                </div>
                <div className="form-section">
                    <motion.div
                        initial={{ x: -200, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Form onSubmit={handleLogin}>
                            <h2 className="mb-4">Login</h2>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group>

                            <Button variant="primary" type="submit" className="mt-3 custom-button">
                                Login
                            </Button>
                            <div className="mt-3">
                                <Link to="/signup">New user? Sign up here</Link>
                            </div>
                        </Form>
                    </motion.div>
                </div>
            </div>
        </Container>
    );
}

export default LoginPage;
