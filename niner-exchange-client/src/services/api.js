// src/services/api.js
import axios from 'axios';

// Create an axios instance with your Django backend's base URL
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
});

// Function to handle the login API call
export const loginUser = async (email, password) => {
    const response = await apiClient.post('/api/auth/login/', {
        email,
        password,
    });
    return response.data;
};

// You can add a function for registration here later
// export const registerUser = async (name, email, password) => { ... };
