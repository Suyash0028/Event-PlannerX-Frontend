// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const api = axios.create({
  baseURL: API_URL,
});

export const loginUser = async (credentials) => {
  const response = await api.post('/users/login', credentials);
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await api.post('/users/register', userData);
  return response.data;
};

export const updateProfile = async (userData) => {
    try {
        const response = await api.put('/users/profile', userData);
        console.log(response);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export const getEvents = async () => {
  const response = await api.get('/events');
  return response.data;
};

export const createEvent = async (eventData) => {
    const token = localStorage.getItem('token');
    const response = await api.post('/events', eventData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };
