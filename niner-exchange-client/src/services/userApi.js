const BASE_URL = import.meta.env.VITE_BASE_URL;

/**
 * Fetch a user's profile by ID.
 * @param {string|number} userId
 * @returns {Promise<Object>} User profile data
 */
import { fetchWithAuth } from './auth';

/**
 * Fetch a user's profile by ID.
 * @param {string|number} userId
 * @returns {Promise<Object>} User profile data
 */
export async function fetchUserProfile(userId) {
    const url = `${BASE_URL}/api/users/${userId}/`;

    try {
        return await fetchWithAuth(url);
    } catch (error) {
        console.error(
            '[API] 6. CRITICAL ERROR: A network, JSON parse, or fetch error occurred:',
            error,
        );
        throw error;
    }
}

export async function fetchCurrentListings(userID) {
    return await fetchWithAuth(
        `${BASE_URL}/api/users/current-listings/${userID}/`,
        {
            method: 'GET',
        },
    );
}

export async function fetchSoldListings(userID) {
    return await fetchWithAuth(
        `${BASE_URL}/api/users/sold-listings/${userID}/`,
        {
            method: 'GET',
        },
    );
}

export async function fetchPurchaseHistory(userID) {
    return await fetchWithAuth(
        `${BASE_URL}/api/users/purchase-history/${userID}/`,
        {
            method: 'GET',
        },
    );
}

export async function updateProfile(data) {
    return await fetchWithAuth(`${BASE_URL}/api/users/me/update/`, {
        method: 'PATCH',
        body: JSON.stringify(data),
    });
}
export async function uploadProfileImage(imageFile) {
    const formData = new FormData();
    formData.append('image', imageFile);

    return await fetchWithAuth(`${BASE_URL}/api/users/me/image/`, {
        method: 'POST',
        body: formData,
    });
}
