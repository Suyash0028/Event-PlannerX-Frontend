import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/routing/ProtectedRoute';
import AdminRoute from './components/routing/AdminRoute';
import { ToastContainer } from 'react-toastify';
import Profile from './pages/Profile';
import PublicRoute from './components/routing/PublicRoutes';
import AboutUs from './pages/information/AboutUS';
import Contact from './pages/information/Contact';
import PrivacyPolicy from './pages/information/PrivacyPolicy';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import UserDashboard from './pages/user-dashboard/UserDashboard';
import CustomNavbar from './components/navbar/CustomNavbar';
import MyEvents from './pages/events/MyEvents';
import AllEvents from './pages/events/AllEvents';
import EditEvent from './pages/events/EditEvent';
import CreateEvent from './pages/events/CreateEvent';
import Footer from './components/footer/Footer';
import EventDetails from './pages/events/EventDetails';
import AdminDashboard from './pages/admin/AdminDashboard';
import UserList from './pages/admin/UserList';
import EventList from './pages/admin/EventList';
import EditUser from './pages/admin/EditUser';
import AdminEditEvent from './pages/admin/AdminEditEvent';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <CustomNavbar />
                <ToastContainer />
                <Routes>
                    <Route path="/" element={<PublicRoute element={<HomePage />} />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/user-dashboard" element={<ProtectedRoute element={<UserDashboard />} />} />
                    <Route path="/myevents" element={<ProtectedRoute element={<MyEvents />} />} />
                    <Route path="/details/:eventId" element={<ProtectedRoute element={<EventDetails />} />} />
                    <Route path="/edit-event/:eventId" element={<ProtectedRoute element={<EditEvent />} />} />
                    <Route path="/allevents" element={<ProtectedRoute element={<AllEvents />} />} />
                    <Route path="/create-event" element={<ProtectedRoute element={<CreateEvent />} />} />
                    <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/privacy" element={<PrivacyPolicy />} />
                    <Route path="/admin-dashboard" element={<AdminRoute element={<AdminDashboard />} />} />
                    <Route path="/users" element={<AdminRoute element={<UserList />} />} />
                    <Route path="/events" element={<AdminRoute element={<EventList />} />} />
                    <Route path="/admin/edit-user/:userId" element={<AdminRoute element={<EditUser />} />} />
                    <Route path="/admin/edit-event/:eventId" element={<AdminRoute element={<AdminEditEvent />} />} />
                </Routes>
                <Footer />
            </Router>
        </AuthProvider>
    );
};

export default App;
