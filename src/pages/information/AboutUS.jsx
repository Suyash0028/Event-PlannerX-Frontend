import React from 'react';
import { Container } from 'react-bootstrap';
import './Information.css';

const AboutUs = () => {
    return (
        <Container className="py-4 custom-info">
            <h2 className="mb-4">About Us</h2>
            <p>
                Welcome to Event-PlannerX, your go-to platform for all your event planning needs. Our mission is to provide an intuitive and comprehensive event management solution for both frequent organizers and occasional planners.
            </p>
            <p>
                At Event-PlannerX, we believe in the power of events to bring people together, create lasting memories, and drive positive change. Our team is dedicated to ensuring that every event, big or small, is managed seamlessly and successfully.
            </p>
            <p>
                Thank you for choosing Event-PlannerX. We look forward to helping you plan your next great event.
            </p>
        </Container>
    );
};

export default AboutUs;
