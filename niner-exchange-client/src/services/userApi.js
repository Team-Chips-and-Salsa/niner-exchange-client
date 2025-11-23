const BASE_URL = import.meta.env.VITE_BASE_URL;

/**
 * Fetch a user's profile by ID.
 * @param {string|number} userId
 * @returns {Promise<Object>} User profile data
 */
export async function fetchUserProfile(userId) {
    const token = localStorage.getItem('django_access_token');

    if (!token) {
        console.error('[API] 2. ERROR: No token found. Unauthorized.');
        throw new Error('Unauthorized');
    }

    const url = `${BASE_URL}/api/users/${userId}/`;

    let response;
    try {
        response = await fetch(url, {
            headers: { Authorization: `Bearer ${token}` },
        });


        const responseData = await response.json();

        if (!response.ok) {
            const errorDetail = responseData.detail || response.statusText;

            console.error(
                `[API] 5. ERROR: Response not OK. Status: ${response.status} - Detail: ${errorDetail}`,
            );
            throw new Error(
                `Failed to fetch user profile (${response.status}): ${errorDetail}`,
            );
        }

        return responseData;
    } catch (error) {
        // This catches network errors, JSON parsing errors, or the re-thrown error above.
        // If response is defined, it means the request went out, but something went wrong
        // with processing the body or the status code.
        console.error(
            '[API] 6. CRITICAL ERROR: A network, JSON parse, or fetch error occurred:',
            error,
        );
        throw error;
    }
}

export async function fetchCurrentListings(userID) {
    const token = localStorage.getItem('django_access_token');

    if (!token) {
        throw new Error('Unauthorized ');
    }

    const response = await fetch(
        `${BASE_URL}/api/users/current-listings/${userID}/`,
        {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        },
    );
    if (!response.ok) {
        throw new Error('Failed to fetch purchase history');
    }
    return await response.json();
}

export async function fetchSoldListings(userID) {
    const token = localStorage.getItem('django_access_token');

    if (!token) {
        throw new Error('Unauthorized ');
    }

    const response = await fetch(
        `${BASE_URL}/api/users/sold-listings/${userID}/`,
        {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        },
    );
    if (!response.ok) {
        throw new Error('Failed to fetch purchase history');
    }
    return await response.json();
}

export async function fetchPurchaseHistory(userID) {
    const token = localStorage.getItem('django_access_token');

    if (!token) {
        throw new Error('Unauthorized ');
    }

    const response = await fetch(
        `${BASE_URL}/api/users/purchase-history/${userID}/`,
        {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        },
    );
    if (!response.ok) {
        throw new Error('Failed to fetch purchase history');
    }
    return await response.json();
}

export async function updateProfile(data) {
    const token = localStorage.getItem('django_access_token');

    if (!token) {
        throw new Error('Unauthorized');
    }

    const response = await fetch(`${BASE_URL}/api/users/me/update/`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to update profile');
    }

    return await response.json();
}
export async function uploadProfileImage(imageFile) {
    const token = localStorage.getItem('django_access_token');
    if (!token) throw new Error('No access token found');

    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await fetch(`${BASE_URL}/api/users/me/image/`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData,
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to upload image');
    }

    return await response.json();
}
