// src/pages/CreateEvent.jsx

import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { createEvent as createEventAPI } from '../services/api';
import './CreateEvent.css';
import Sidebar from '../components/Sidebar';

const CreateEvent = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState('');
    const [capacity, setCapacity] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);

    const handleCreateEvent = async (e) => {
        e.preventDefault();
        try {
            const eventData = {
                title,
                description,
                date,
                time,
                location,
                price,
                capacity,
                isPrivate,
            };
            await createEventAPI(eventData);
            toast.success('Event created successfully!');
            setTitle('');
            setDescription('');
            setDate('');
            setTime('');
            setLocation('');
            setPrice('');
            setCapacity('');
            setIsPrivate(false);
        } catch (error) {
            toast.error('Failed to create event. Please try again.');
        }
    };

    return (
        <div className="dashboard">
            <Sidebar />
            <div className="main-content">
                <Container>
                    <h2>Create Event</h2>
                    <Form onSubmit={handleCreateEvent} className="create-event-form">
                        <Form.Group controlId="title">
                            <Form.Label>Event Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter event title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="description">
                            <Form.Label>Event Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter event description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="date">
                            <Form.Label>Event Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="time">
                            <Form.Label>Event Time</Form.Label>
                            <Form.Control
                                type="time"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="location">
                            <Form.Label>Event Location</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter event location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="price">
                            <Form.Label>Event Price</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter event price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="capacity">
                            <Form.Label>Event Capacity</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter event capacity"
                                value={capacity}
                                onChange={(e) => setCapacity(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="isPrivate">
                            <Form.Check
                                type="checkbox"
                                label="Private Event"
                                checked={isPrivate}
                                onChange={(e) => setIsPrivate(e.target.checked)}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="mt-3">
                            Create Event
                        </Button>
                    </Form>
                </Container>
            </div>
        </div>
    );
};

export default CreateEvent;
