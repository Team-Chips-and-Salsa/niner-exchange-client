const BASE_URL = import.meta.env.VITE_BASE_URL;
import { connectImagesById } from './imagesApi';

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
    return data;
}

export async function createListing(formData, endpoint) {
    const token = localStorage.getItem('django_access_token');

    if (!token) {
        throw new Error('Unauthorized');
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(formData),
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const listing = await response.json();
    return listing.listing_id;
}

export async function updateListing(formData) {
    const token = localStorage.getItem('django_access_token');

    if (!token) {
        throw new Error('Unauthorized');
    }

    const endpoint = 'api/listings/' + formData.listing_id + '/edit/';
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        method: 'PATCH',
        mode: 'cors',
        body: JSON.stringify(formData),
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const listing = await response.json();
    return listing.listing_id;
}

export async function submitFullListing(formData, imageFiles) {
    let endpoint = '';

    if (!formData.listing_type) {
        throw new Error(
            `Invalid listing_type requested: ${formData.listing_type}`,
        );
    }

    // For multi-table inheritance we have different endpoints
    switch (formData.listing_type) {
        case 'TEXTBOOK':
            endpoint = `/api/textbooks/`;
            break;
        case 'SUBLEASE':
            endpoint = `/api/subleases/`;
            break;
        case 'ITEM':
            endpoint = `/api/items/`;
            break;
        case 'SERVICE':
            endpoint = `/api/services/`;
            break;
    }

    const { listing_type, ...cleanFormData } = formData;
    let data;
    if (formData.listing_id != null) {
        data = await updateListing(cleanFormData);
    } else {
        data = await createListing(cleanFormData, endpoint);
    }
    await connectImagesById(data, imageFiles);
    return data;
}

export async function deleteListing(listingId) {
    const token = localStorage.getItem('django_access_token');

    if (!token) {
        throw new Error('Unauthorized');
    }

    const response = await fetch(
        `${BASE_URL}/api/listings/${listingId}/delete/`,
        {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to delete listing');
    }

    // DELETE typically returns 204 No Content, so no JSON to parse
    return true;
}
