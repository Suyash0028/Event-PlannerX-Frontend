import React from 'react';
import './CardComponent.css';
import { Container } from 'react-bootstrap';
import eventIMG from '/upcoming-events.jpg';
import { Link } from 'react-router-dom';
import Spinner from '../spinner/Spinner';

const CardComponent = ({ events }) => {
    return (
        <Container>
            <div className="events-container">
                {events.length === 0 ? (
                    <div className="no-events-message">
                        <h4>No Events Available</h4>
                        <p>We currently have no events available. Please check back later or explore other sections.</p>
                    </div>
                ) : (
                    events.map((event) => (
                        <div key={event._id} className="card-container">
                            <img className="card-img" src={eventIMG} alt="Event" />
                            <div className="detail-section">
                                <h5 className="card-title">
                                    <Link to={`/details/${event._id}`}>{event.title}</Link>
                                </h5>
                                <p className="card-text">{event.description}</p>
                                <p className="card-text">Price: ${event.price}</p>
                                <p className="card-text">Location: {event.location}</p>
                                <p className="card-text">Organizer: {event.organizer.username}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </Container>
    );
};

export default CardComponent;
