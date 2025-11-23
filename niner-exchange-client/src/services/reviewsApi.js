const BASE_URL = import.meta.env.VITE_BASE_URL;

import { fetchWithAuth } from './auth.js';

export async function fetchReviews(userId) {
    const url = `${BASE_URL}/api/users/${userId}/reviews/`;

    return await fetchWithAuth(url, { method: 'GET' });
}

export async function fetchUserProfile(userId) {
    const url = `${BASE_URL}/api/users/${userId}/`;

    return await fetchWithAuth(url, { method: 'GET' });
}

export async function createReviews(reviewData) {
    return await fetchWithAuth(`${BASE_URL}/api/reviews/`, {
        method: 'POST',
        body: JSON.stringify(reviewData),
    });
}
