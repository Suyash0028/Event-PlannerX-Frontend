import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import UserDashboard from './components/UserDashboard';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import CreateEvent from './pages/CreateEvent';
import Profile from './pages/Profile';
import PublicRoute from './components/PublicRoutes';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <ToastContainer />
                <Routes>
                    <Route path="/" element={<PublicRoute element={<HomePage />} />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/dashboard" element={<ProtectedRoute element={<UserDashboard />} />} />
                    <Route path="/my-events" element={<ProtectedRoute element={<UserDashboard />} />} />
                    <Route path="/all-events" element={<ProtectedRoute element={<UserDashboard />} />} />
                    <Route path="/create-event" element={<ProtectedRoute element={<CreateEvent />} />} />
                    <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
