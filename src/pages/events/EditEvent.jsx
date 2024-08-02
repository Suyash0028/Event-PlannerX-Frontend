import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { getEventById, updateEvent, deleteEvent } from '../../services/api';
import './CreateEvent.css';
import Sidebar from '../../components/sidebar/Sidebar';
import Spinner from '../../components/spinner/Spinner';

const EditEvent = () => {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const [eventDetails, setEventDetails] = useState(null);

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const data = await getEventById(eventId);
                setEventDetails(data);
            } catch (error) {
                toast.error('Failed to fetch event details. Please try again.');
            }
        };

        fetchEventDetails();
    }, [eventId]);

    if(!eventDetails){
        return <Spinner />;
    }

    const handleUpdateEvent = async (e) => {
        e.preventDefault();
        try {
            await updateEvent(eventId, eventDetails);
            toast.success('Event updated successfully!');
            navigate('/details/'+eventId);
        } catch (error) {
            toast.error('Failed to update event. Please try again.');
        }
    };

    const handleDeleteEvent = async () => {
        try {
            await deleteEvent(eventId);
            toast.success('Event deleted successfully!');
            navigate('/myevents'); 
        } catch (error) {
            toast.error('Failed to delete event. Please try again.');
        }
    };

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;
        setEventDetails((prevDetails) => ({
            ...prevDetails,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    return (
        <div className="dashboard">
            <Sidebar />
            <div className="main-content">
                <Container>
                    <h2>Edit Event</h2>
                    <Form onSubmit={handleUpdateEvent} className="create-event-form">
                        <Form.Group controlId="title">
                            <Form.Label>Event Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={eventDetails.title}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="description">
                            <Form.Label>Event Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="description"
                                value={eventDetails.description}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="date">
                            <Form.Label>Event Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="date"
                                value={eventDetails.date}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="time">
                            <Form.Label>Event Time</Form.Label>
                            <Form.Control
                                type="time"
                                name="time"
                                value={eventDetails.time}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="location">
                            <Form.Label>Event Location</Form.Label>
                            <Form.Control
                                type="text"
                                name="location"
                                value={eventDetails.location}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="price">
                            <Form.Label>Event Price</Form.Label>
                            <Form.Control
                                type="number"
                                name="price"
                                value={eventDetails.price}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="capacity">
                            <Form.Label>Event Capacity</Form.Label>
                            <Form.Control
                                type="number"
                                name="capacity"
                                value={eventDetails.capacity}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="isPrivate">
                            <Form.Check
                                type="checkbox"
                                label="Private Event"
                                name="isPrivate"
                                checked={eventDetails.isPrivate}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="mt-3">
                            Update Event
                        </Button>
                        <Button
                            variant="danger"
                            className="mt-3 ml-3"
                            onClick={handleDeleteEvent}
                        >
                            Delete Event
                        </Button>
                    </Form>
                </Container>
            </div>
        </div>
    );
};

export default EditEvent;
