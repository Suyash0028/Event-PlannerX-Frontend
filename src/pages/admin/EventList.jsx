import React, { useEffect, useState } from 'react';
import { Table, Button, Container } from 'react-bootstrap';
import { getEvents, deleteEvent } from '../../services/api';
import { Link } from 'react-router-dom';
import './EventList.css';
import Sidebar from './Sidebar';
import ConfirmationModal from '../../components/modal/ConfirmationModal';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await getEvents();
      setEvents(data);
    };
    fetchEvents();
  }, []);

  const handleDelete = async (event) => {
    setSelectedEvent(event);
    setShowModal(true);
    setSelectedAction(false);
  };

  const handleConfirmDelete = async () => {
    try {
        await deleteEvent(selectedEvent._id);
        setEvents(events.filter(event => event._id !== selectedEvent._id));
    } catch (error) {
      console.error('Failed to delete:', error);
    }
    setShowModal(false);
    setSelectedUser(null);
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <Container>
          <h1>Events</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Price</th>
                <th>Private Event</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map(event => (
                <tr key={event._id}>
                  <td>{event.title}</td>
                  <td>{event.description}</td>
                  <td>${event.price}</td>
                  <td>{event.isPrivate ? '✓' : '✗'}</td>
                  <td>
                    <Link to={`/admin/edit-event/${event._id}`} className="btn btn-primary">
                      Edit
                    </Link>
                    &nbsp;&nbsp;&nbsp;
                    <Button variant="danger" onClick={() => handleDelete(event)} className="ml-2">
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <ConfirmationModal
            show={showModal}
            handleClose={() => setShowModal(false)}
            handleConfirm={handleConfirmDelete}
            title="Confirm Delete"
            body={`Are you sure you want to delete this?`}
          />
        </Container>
      </div>
    </div>
  );
};

export default EventList;
