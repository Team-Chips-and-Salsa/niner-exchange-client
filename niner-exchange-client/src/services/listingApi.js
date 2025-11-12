const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function fetchListings(params = {}) {
    const token = localStorage.getItem('django_access_token');

    if (!token) {
        throw new Error('Unauthorized ');
    }

    const filteredParams = {};
    for (const key in params) {
        if (params[key]) {
            // Omit listing_type when it's "ALL" (treat as no filter)
            if (
                key === 'listing_type' &&
                String(params[key]).trim().toUpperCase() === 'ALL'
            ) {
                continue;
            }
            filteredParams[key] = params[key];
        }
    }

    const queryString = new URLSearchParams(filteredParams).toString();

    const url = `${BASE_URL}/api/listings/${queryString ? `?${queryString}` : ''}`;

    const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return await response.json();
}

export async function fetchListingById(listingId) {
    console.log('Fetching listing with ID:', listingId);
    const token = localStorage.getItem('django_access_token');

    if (!token) {
        throw new Error('Unauthorized');
    }

    const response = await fetch(`${BASE_URL}/api/listings/${listingId}/`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log('Fetched listing data:', data);
    return data;
}
