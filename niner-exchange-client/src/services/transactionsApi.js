import { fetchWithAuth } from './auth.js';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function fetchTransaction(transactionId) {
    return await fetchWithAuth(`${BASE_URL}/api/transactions/${transactionId}/`, {
        method: 'GET',
    });
}