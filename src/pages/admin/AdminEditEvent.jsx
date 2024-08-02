import React, { useEffect, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { getEventById, updateEvent } from '../../services/api';
import './AdminEditEvent.css';
import Sidebar from './Sidebar';

const AdminEditEvent = () => {
    const { eventId } = useParams();
    const [event, setEvent] = useState({});
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState('');
    const [capacity, setCapacity] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvent = async () => {
            const data = await getEventById(eventId);
            setEvent(data);
            setTitle(data.title);
            setDescription(data.description);
            setDate(data.date.split('T')[0]);
            setTime(data.time);
            setLocation(data.location);
            setPrice(data.price);
            setCapacity(data.capacity);
            setIsPrivate(data.isPrivate);
        };

        fetchEvent();
    }, [eventId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateEvent(eventId, { title, description, date, time, location, price, capacity, isPrivate });
            navigate('/events');
        } catch (error) {
            console.error('Failed to update event:', error);
        }
    };

    return (
        <div className="dashboard">
            <Sidebar />
            <div className="main-content">
                <Container>
                    <div className="profile-card">
                        <h2>Edit Event</h2>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formTitle">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formDescription">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formDate">
                                <Form.Label>Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formTime">
                                <Form.Label>Time</Form.Label>
                                <Form.Control
                                    type="time"
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formLocation">
                                <Form.Label>Location</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formPrice">
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formCapacity">
                                <Form.Label>Capacity</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={capacity}
                                    onChange={(e) => setCapacity(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formIsPrivate">
                                <Form.Check
                                    type="checkbox"
                                    label="Private Event"
                                    checked={isPrivate}
                                    onChange={(e) => setIsPrivate(e.target.checked)}
                                />
                            </Form.Group>

                            <Button variant="primary" type="submit" className="mt-3">
                                Save Changes
                            </Button>
                        </Form>
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default AdminEditEvent;
