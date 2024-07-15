import React from 'react';
import { Container } from 'react-bootstrap';
import Sidebar from '../components/Sidebar';

const AllEvents = () => {
    return (
        <div className="dashboard">
            <Sidebar />
            <div className="main-content">
                <Container>
                    <h2>All Events</h2>
                    {/* List user's events here */}
                </Container>
            </div>
        </div>
    );
};

export default AllEvents;
