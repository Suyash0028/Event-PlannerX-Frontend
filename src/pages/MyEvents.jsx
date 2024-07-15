import React from 'react';
import Sidebar from '../components/Sidebar';
import { Container } from 'react-bootstrap';

const MyEvents = () => {
    return (
        <div className="dashboard">
            <Sidebar />
            <div className="main-content">
                <Container>
                    <h2>My Events</h2>
                    {/* List user's events here */}
                </Container>
            </div>
        </div>
    );
};

export default MyEvents;
