import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { fetchMyEvents } from '../../services/api';
import Sidebar from '../../components/sidebar/Sidebar';
import CardComponent from '../../components/card/CardComponent';
import Spinner from '../../components/spinner/Spinner';


const MyEvents = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const getEvents = async () => {
            const data = await fetchMyEvents();
            setEvents(data);
        };
        getEvents();
    }, []);

    if(!events){
        return <Spinner />;
    }

    return (
        <div className="dashboard">
            <Sidebar />
            <div className="main-content">
                <Container><h2>My Events</h2></Container>
                <CardComponent events={events} />
            </div>
        </div>
    );
};

export default MyEvents;
