import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const login = (username, password) =>
  axios.post(`${API_URL}/auth/login`, { username, password });

export const getInterviews = (token) =>
  axios.get(`${API_URL}/interviews`, { headers: { Authorization: `Bearer ${token}` } });

export const addInterview = (interviewData, token) =>
  axios.post(`${API_URL}/interviews`, interviewData, { headers: { Authorization: `Bearer ${token}` } });
