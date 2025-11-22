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
    const token = localStorage.getItem('django_access_token');

    if (!token) {
        throw new Error('Unauthorized');
    }

    const response = await fetch(`${BASE_URL}/api/reviews/`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
    });

    if (!response.ok) {
        throw new Error(`Failed to create review: ${response.status}`);
    }

    return await response.json();
}
