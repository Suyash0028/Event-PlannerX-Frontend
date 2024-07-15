// src/pages/SignupPage.jsx
import { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { registerUser } from '../services/api';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AuthPage.css';
import { useAuth } from '../context/AuthContext';

function SignupPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const result = await registerUser({ username, email, password });
            if (result) {
                toast.success('Registration successful!');
                login(result.token);
                navigate('/dashboard');
            }
        } catch (e) {
            toast.error('Registration failed. Please try again.');
        }
    };

  return (
    <Container className="auth-page">
      <div className="auth-container">
        <div className="message-section d-flex flex-column justify-content-center">
          <motion.div
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2>Welcome New User!</h2>
            <p>Sign up to get started.</p>
          </motion.div>
        </div>
        <div className="form-section">
          <motion.div
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Form onSubmit={handleSignup}>
              <h2 className="mb-4">Sign Up</h2>
              <Form.Group controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>

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

              <Button variant="primary" type="submit" className="mt-3">
                Sign Up
              </Button>
              <div className="mt-3">
                <Link to="/login">Already registered? Login here</Link>
              </div>
            </Form>
          </motion.div>
        </div>
      </div>
    </Container>
  );
}

export default SignupPage;
