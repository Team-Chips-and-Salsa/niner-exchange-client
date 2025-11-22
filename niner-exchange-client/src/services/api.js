import axios from 'axios';

// axios instance
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
});

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
    listing,
    buyer,
    seller,
    meetup_location,
    final_price,
}) => {

    const response = await apiClient.post('/api/transactions/', {
        listing,
        buyer,
        seller,
        meetup_location,
        final_price,
    });
    return response.data;
};

export const updateTransactionStatus = async (transactionUuid, status) => {
    const response = await apiClient.patch(
        `/api/transactions/${transactionUuid}/update-status/`,
        {
            status,
        },
    );
    return response.data;
};
