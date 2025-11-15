import axios from 'axios';

// Create an axios instance
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
});

// Attach Authorization header from localStorage for each request
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('django_access_token');
    if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Meetup Locations
export const getMeetupLocations = async () => {
    const response = await apiClient.get('/api/meetup-locations/');
    return response.data;
};

// Transactions
export const createTransaction = async ({
    buyer,
    seller,
    meetup_location,
    final_price,
}) => {
    const response = await apiClient.post('/api/transactions/', {
        buyer,
        seller,
        meetup_location,
        final_price,
    });
    return response.data;
};

export const updateTransactionStatus = async (transactionUuid, status) => {
    const response = await apiClient.patch(
        `/api/transactions/${transactionUuid}/`,
        {
            status,
        },
    );
    return response.data;
};
