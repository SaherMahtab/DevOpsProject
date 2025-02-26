import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://devops-server-production.up.railway.app/', // Replace with your backend URL
    // baseURL: 'http://127.0.0.1:3000/', // Replace with your backend URL

    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // Add auth token or other headers here if needed
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle error responses here
        return Promise.reject(error);
    }
);

export default axiosInstance;