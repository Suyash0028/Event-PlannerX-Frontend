import React, { useEffect, useState } from 'react';
import { Table, Button, Container } from 'react-bootstrap';
import { getUsers, deleteUser } from '../../services/api';
import { Link } from 'react-router-dom';
import './UserList.css';
import Sidebar from './Sidebar';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsers();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    await deleteUser(userId);
    setUsers(users.filter(user => user._id !== userId));
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <Container>
          <h1>Users</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Is Admin</th>
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
                    <Button variant="danger" onClick={() => handleDelete(user._id)} className="ml-2">
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </div>
    </div>

  );
};

export default UserList;
