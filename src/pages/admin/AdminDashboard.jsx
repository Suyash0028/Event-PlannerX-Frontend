import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Button, } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';
import Sidebar from './Sidebar';
import { deleteEvent, deleteUser, getEvents, getUsers } from '../../services/api';
import ConfirmationModal from '../../components/modal/ConfirmationModal';
const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedAction, setSelectedAction] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsers();
      setUsers(data);
    };
    const fetchEvents = async () => {
      const data = await getEvents();
      setEvents(data);
    };
    fetchUsers();
    fetchEvents();
  }, []);

  const handleUserDelete = async (user) => {
    setSelectedUser(user);
    setShowModal(true);
    setSelectedAction(true);
  };

  const handleConfirmDelete = async () => {
    try {
      if(selectedAction){
        await deleteUser(selectedUser._id);
        setUsers(users.filter(user => user._id !== selectedUser._id));
      }
      else{
        await deleteEvent(selectedEvent._id);
        setEvents(events.filter(event => event._id !== selectedEvent._id));
      }
    } catch (error) {
      console.error('Failed to delete:', error);
    }
    setShowModal(false);
    setSelectedUser(null);
  };

  const handleEventDelete = async (event) => {
    setSelectedEvent(event);
    setShowModal(true);
    setSelectedAction(false);
  };


  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <Container>
          <h1>Welcome to your dashboard admin!!</h1>
          <Row className='mt-5'>
            <Col md={6}>
              <h4>Users</h4>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Admin</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user._id}>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.isAdmin ? '✓' : '✗'}</td>
                      <td>
                        <Link to={`/admin/edit-user/${user._id}`} className="btn btn-primary">
                          Edit
                        </Link>
                        &nbsp;&nbsp;&nbsp;
                        <Button variant="danger" onClick={() => handleUserDelete(user)} className="ml-2">
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
            <Col md={6}>
              <h4>Events</h4>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Private</th>
                    <th>Location</th>
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
                      <td>{event.location}</td>
                      <td>
                        <Link to={`/admin/edit-event/${event._id}`} className="btn btn-primary">
                          Edit
                        </Link>
                        &nbsp;&nbsp;&nbsp;
                        <Button variant="danger" onClick={() => handleEventDelete(event)} className="ml-2">
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
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

export default AdminDashboard;
