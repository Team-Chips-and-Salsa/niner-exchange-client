const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function fetchReviews(userId) {
    const token = localStorage.getItem('django_access_token');

    if (!token) {
        throw new Error('Unauthorized');
    }

    const response = await fetch(`${BASE_URL}/api/reviews/${userId}/`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch user reviews: ${response.status}`);
    }


    return await response.json();
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
            'Content-Type': 'application/json'},
        body: JSON.stringify(reviewData),
    });

    if (!response.ok) {
        throw new Error(`Failed to create review: ${response.status}`);
    }


    return await response.json();
}
