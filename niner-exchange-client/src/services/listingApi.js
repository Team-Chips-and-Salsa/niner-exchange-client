const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function fetchListings() {
    const token = localStorage.getItem('django_access_token');

    if (!token) {
        throw new Error('Unauthorized ');
    }

    const response = await fetch(`${BASE_URL}/api/listings/`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return await response.json();
}
