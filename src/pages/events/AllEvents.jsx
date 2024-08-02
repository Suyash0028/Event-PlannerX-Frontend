import React, { useEffect, useState } from 'react';
import { getEvents } from '../../services/api';
import CardComponent from '../../components/card/CardComponent';
import Sidebar from '../../components/sidebar/Sidebar';
import { Container } from 'react-bootstrap';
import Spinner from '../../components/spinner/Spinner';

const AllEvents = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const loadEvents = async () => {
            const allEvents = await getEvents();
            setEvents(allEvents);
        };
        loadEvents();
    }, []);

    if(!events){
        return <Spinner />;
    }
    
    return (
        <div className="dashboard">
            <Sidebar />
            <div className="main-content">
                <Container>{events.filter(e => !e.isPrivate).length > 0 ? <h2>All Events</h2> : <></>}</Container>
                <CardComponent events={events.filter(e => !e.isPrivate)} />
            </div>
        </div>
    );
};

export default AllEvents;
