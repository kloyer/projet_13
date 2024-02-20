// src/services/userService.js
const API_BASE_URL = 'http://localhost:3001/api/v1';

export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) throw new Error('Login failed');
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchProfile = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error('Fetching profile failed');
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateProfile = async (token, firstName, lastName) => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ firstName, lastName }),
    });
    if (!response.ok) throw new Error('Updating profile failed');
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
