const BASE_URL = import.meta.env.VITE_BASE_URL;
import { connectImagesById } from './imagesApi';

import { fetchWithAuth } from './auth';

export async function fetchListings(params = {}) {
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

    return await fetchWithAuth(url);
}

export async function fetchListingById(listingId) {
    return await fetchWithAuth(`${BASE_URL}/api/listings/${listingId}/`);
}

export async function createListing(formData, endpoint) {
    const listing = await fetchWithAuth(`${BASE_URL}${endpoint}`, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(formData),
    });
    return listing.listing_id;
}

export async function updateListing(formData) {
    const endpoint = 'api/listings/' + formData.listing_id + '/edit/';
    const listing = await fetchWithAuth(`${BASE_URL}${endpoint}`, {
        method: 'PATCH',
        mode: 'cors',
        body: JSON.stringify(formData),
    });
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
    await fetchWithAuth(`${BASE_URL}/api/listings/${listingId}/delete/`, {
        method: 'DELETE',
    });
    return true;
}
