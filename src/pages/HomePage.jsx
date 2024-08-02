import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EventIcon from '@mui/icons-material/Event';
import PeopleIcon from '@mui/icons-material/People';
import StarIcon from '@mui/icons-material/Star';
import SecurityIcon from '@mui/icons-material/Security';
import PublicIcon from '@mui/icons-material/Public';
import EmailIcon from '@mui/icons-material/Email';
import { getEvents } from '../services/api';
import './HomePage.css';
import CardComponent from '../components/card/CardComponent';
import Spinner from '../components/spinner/Spinner';

const HomePage = () => {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const loadEvents = async () => {
            const allEvents = await getEvents();
            setEvents(allEvents);
        };
        loadEvents();
    }, []);

    const handleGetStartedClick = () => {
        navigate('/signup');
    };
    if (!events) {
        return <Spinner />;
    }

    return (
        <div className="homepage-content">
            <div className="hero-section">
                <div className="container">
                    <h1 className="display-4">Welcome to Event-PlannerX</h1>
                    <p className="lead">
                        Plan, manage, and track your events effortlessly with our intuitive platform.
                    </p>
                    <button className="btn btn-custom" onClick={handleGetStartedClick}>
                        Get Started
                    </button>
                </div>
            </div>

            <div className="container py-5">
                <h2 className="text-center mb-4">Our Purpose</h2>
                <p className="text-center">
                    The goal of the Event-PlannerX project is to develop an all-inclusive, intuitive event management platform that serves both frequent users (organizers) and infrequent users (guests). Our system ensures role-based access control and secure authentication, making event planning and management easier while offering a safe and enjoyable experience to all users.
                </p>
            </div>

            <div className="container py-5">
                <h2 className="text-center mb-4">Core Features</h2>
                <div className="row">
                    <div className="col-md-4 mb-4">
                        <div className="card h-100 text-center">
                            <div className="card-body">
                                <EventIcon className="icon-color" fontSize="large" />
                                <h5 className="card-title">Event Planning</h5>
                                <p className="card-text">Easily plan your events with our intuitive tools.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4">
                        <div className="card h-100 text-center">
                            <div className="card-body">
                                <PeopleIcon className="icon-color" fontSize="large" />
                                <h5 className="card-title">Attendee Management</h5>
                                <p className="card-text">Manage your attendees and their details efficiently.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4">
                        <div className="card h-100 text-center">
                            <div className="card-body">
                                <StarIcon className="icon-color" fontSize="large" />
                                <h5 className="card-title">Feedback & Reviews</h5>
                                <p className="card-text">Collect feedback and reviews to improve your events.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4">
                        <div className="card h-100 text-center">
                            <div className="card-body">
                                <SecurityIcon className="icon-color" fontSize="large" />
                                <h5 className="card-title">Secure Authentication</h5>
                                <p className="card-text">Role-based access control and secure authentication.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4">
                        <div className="card h-100 text-center">
                            <div className="card-body">
                                <PublicIcon className="icon-color" fontSize="large" />
                                <h5 className="card-title">Event Visibility</h5>
                                <p className="card-text">Set event visibility to public or private.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4">
                        <div className="card h-100 text-center">
                            <div className="card-body">
                                <EmailIcon className="icon-color" fontSize="large" />
                                <h5 className="card-title">Email Notifications</h5>
                                <p className="card-text">Receive notifications for event updates and ticket purchases.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="testimonials-section">
                <div className="container">
                    <h2 className="text-center mb-4">User Stories</h2>
                    <div className="row">
                        <div className="col-md-6 mb-4">
                            <div className="card h-100 text-center">
                                <div className="card-body">
                                    <h5 className="card-title">Jane Doe, Community Leader</h5>
                                    <p className="card-text">
                                        "Event-PlannerX made organizing my neighborhood cleanup event a breeze! The intuitive interface and efficient attendee management tools were incredibly helpful."
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 mb-4">
                            <div className="card h-100 text-center">
                                <div className="card-body">
                                    <h5 className="card-title">John Smith, Event Organizer</h5>
                                    <p className="card-text">
                                        "A must-have tool for any event planner. The ability to track attendee information and send out notifications was crucial for the success of our event."
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {events.filter(e => !e.isPrivate).length > 0 ? <h2 className="text-center mb-4">All Events</h2> : <></>}
            <CardComponent events={events.filter(e => !e.isPrivate)} />
        </div>
    );
};

export default HomePage;
