import React, { useEffect, useState } from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar';
import { toast } from 'react-toastify';
import './EventDetails.css';
import { getEventById } from '../../services/api';
import eventIMG from '/upcoming-events.jpg'
import { useAuth } from '../../context/AuthContext';
import Spinner from '../../components/spinner/Spinner';
import emailjs from 'emailjs-com';

const EventDetails = () => {
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);
    const { currentUser } = useAuth();
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const data = await getEventById(eventId);
                setEvent(data);
            } catch (error) {
                console.error('Failed to fetch event details', error);
            }
        };
        fetchEvent();
    }, [eventId]);


    if (!event) {
        return <Spinner />;
    }

    const taxRate = 0.1;
    const totalPrice = event.price * quantity;
    const taxAmount = totalPrice * taxRate;
    const totalAmountWithTax = totalPrice + taxAmount;

    const sendTicketEmail = (ticketDetails) => {
        const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
        const templateParams = {
            to_email: currentUser.email,
            from_email: adminEmail,
            event_name: ticketDetails.eventName,
            event_date: ticketDetails.eventDate,
            event_time: ticketDetails.eventTime,
            event_location: ticketDetails.eventLocation,
            ticket_price: ticketDetails.price,
            ticket_quantity: ticketDetails.ticket_quantity,
            total_Price: ticketDetails.total_Price
        };
        const serviceKey = import.meta.env.VITE_SERVICE_KEY;
        const templateKey = import.meta.env.VITE_TEMPLATE_KEY;
        const userId = import.meta.env.VITE_USER_ID;

        emailjs.send(serviceKey, templateKey, templateParams, userId)
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                toast.success(`You have successfully purchased ${quantity} tickets!`);
                navigate('/');
            })
            .catch((err) => {
                console.error('FAILED...', err);
                toast.error('Failed to send ticket details. Please try again later.');
            });
    };


    const handleGetTickets = (event) => {
        const ticketDetails = {
            eventName: event.title,
            eventDate: formatDate(event.date),
            eventTime: formatTime(event.time),
            eventLocation: event.location,
            price: event.price.toFixed(2),
            ticket_quantity: quantity,
            total_Price: totalAmountWithTax.toFixed(2)
        };

        sendTicketEmail(ticketDetails);
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    const formatTime = (timeString) => {
        const [hour, minute] = timeString.split(':');
        const hourInt = parseInt(hour, 10);
        const minuteInt = parseInt(minute, 10);
        const ampm = hourInt >= 12 ? 'PM' : 'AM';
        const formattedHour = hourInt % 12 === 0 ? 12 : hourInt % 12;
        return `${formattedHour}:${minuteInt < 10 ? '0' + minuteInt : minuteInt} ${ampm}`;
    };

    const handleQuantityChange = (e) => {
        const value = e.target.value;
        if (value === '' || /^[1-9]\d*$/.test(value)) {
            setQuantity(value);
        }
    };

    return (
        <div className="dashboard">
            <Sidebar />
            <div className="main-content">
                <Container>
                    <h2>Event Details</h2>
                    <div className="events-detail-container">
                        <div className="event-details-card">
                            <img className="event-img" src={eventIMG} alt={event.title} />
                            <div className="event-info">
                                <h3>{event.title}</h3>
                                <p>{event.description}</p>
                                <p>Date: {formatDate(event.date)}</p>
                                <p>Time: {formatTime(event.time)}</p>
                                <p>Location: {event.location}</p>
                                <p>Organizer: {event.organizer.username}</p>
                                <p>Price: ${event.price.toFixed(2)}</p>
                                <p>Capacity: {event.capacity}</p>
                            </div>
                        </div>
                        <div className="ticket-purchase">
                            <div className="invoice-header">
                                <h3>Invoice</h3>
                                <p><strong>Event:</strong> {event.title}</p>
                                <p><strong>Date:</strong> {formatDate(event.date)}</p>
                                <p><strong>Time:</strong> {formatTime(event.time)}</p>
                            </div>
                            <Form>
                                <Form.Group controlId="quantity" className="mb-3">
                                    <Form.Label>Quantity:</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={quantity}
                                        onChange={handleQuantityChange}
                                        min="1"
                                        className="quantity-input"
                                    />
                                </Form.Group>
                                <div className="invoice-details">
                                    <div className="invoice-item">
                                        <p>Unit Price:</p>
                                        <p>${event.price.toFixed(2)}</p>
                                    </div>
                                    <div className="invoice-item">
                                        <p>Price:</p>
                                        <p>${totalPrice.toFixed(2)}</p>
                                    </div>
                                    <div className="invoice-item">
                                        <p>Tax:</p>
                                        <p>${taxAmount.toFixed(2)}</p>
                                    </div>
                                    <div className="invoice-item total">
                                        <p><strong>Total:</strong></p>
                                        <p><strong>${totalAmountWithTax.toFixed(2)}</strong></p>
                                    </div>
                                </div>
                                <Button variant="success" onClick={()=>handleGetTickets(event)} className="mt-4">
                                    Get Tickets
                                </Button>
                            </Form>
                        </div>

                        <div className="event-actions">
                            {currentUser.username.trim() === event.organizer.username.trim() ? <Button variant="primary" as={Link} to={`/edit-event/${event._id}`} className="mt-3">
                                Edit Event
                            </Button> : <></>}
                            <Button variant="secondary" onClick={() => navigate('/myevents')} className="mt-3">
                                Back
                            </Button>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default EventDetails;
