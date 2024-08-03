import axios from 'axios';
import { getItemWithExpiry } from './localStorageService';

const API_URL = import.meta.env.VITE_API_URL;
export const api = axios.create({
  baseURL: API_URL,
});

// Login
export const loginUser = async (credentials) => {
  const response = await api.post('/users/login', credentials);
  return response.data;
};

// Register
export const registerUser = async (userData) => {
  const response = await api.post('/users/register', userData);
  return response.data;
};

// Update user profile
export const updateProfile = async (userData) => {
  try {
    const token = getItemWithExpiry('token');
    const response = await api.put('/users/profile', userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

// Fetch current logged in user
export const fetchCurrentUser = async () => {
  try {
    const token = getItemWithExpiry('token');
    const response = await api.get('/users/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
}

// Get all users
export const getUsers = async () => {
  try {
    const token = getItemWithExpiry('token');
    const response = await api.get('/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

// Delete an user
export const deleteUser = async (id) => {
  const token = getItemWithExpiry('token');
  const response = await api.delete(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }});
  return response.data;
};

// Update an user
export const updateUser = async (id) => {
  const token = getItemWithExpiry('token');
  const response = await api.put(`/users/${id}`, eventData, {
    headers: {
      Authorization: `Bearer ${token}`,
    }});
  return response.data;
};

// Get user by ID
export const getUserById = async (id) => {
  const token = getItemWithExpiry('token');
  const response = await api.get(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }});
  return response.data;
};

// Get all events
export const getEvents = async () => {
  const response = await api.get('/events');
  return response.data;
};

// Get my events
export const fetchMyEvents = async () => {
  try {
    const token = getItemWithExpiry('token');
    const response = await api.get('/events/myevents', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
}

// Create an create
export const createEvent = async (eventData) => {
  const token = getItemWithExpiry('token');
  const response = await api.post('/events', eventData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Update an event
export const updateEvent = async (id, eventData) => {
  const token = getItemWithExpiry('token');
  const response = await api.put(`/events/${id}`, eventData, {
    headers: {
      Authorization: `Bearer ${token}`,
    }});
  return response.data;
};

// Delete an event
export const deleteEvent = async (id) => {
  const token = getItemWithExpiry('token');
  const response = await api.delete(`/events/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }});
  return response.data;
};

// Get event by ID
export const getEventById = async (id) => {
  const token = getItemWithExpiry('token');
  const response = await api.get(`/events/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }});
  return response.data;
};