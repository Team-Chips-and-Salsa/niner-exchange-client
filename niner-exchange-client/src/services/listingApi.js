const BASE_URL = import.meta.env.VITE_BASE_URL;
import { connectImagesById } from "./imagesApi";

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

export async function createListing(formData, endpoint) {
    const token = localStorage.getItem('django_access_token');

    if (!token) {
        throw new Error("Unauthorized");
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(formData)
    })

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const listing = await response.json();
    return listing.listing_id;
}

export async function submitFullListing(formData, imageFiles) {
    let endpoint = '';

    if (!formData.category) {
        throw new Error(`Invalid category requested: ${formData.category}`)
    }
    
    // For multi-table inheritance we have different endpoints
    switch(formData.category) {
        case "Textbook":
            endpoint = `/api/textbooks/`;
        break;
        case "Housing":
            endpoint = `/api/subleases/`;
        break;
        case "Marketplace":
            endpoint = `/api/items/`;
        break;
        case "Service":
            endpoint = `/api/services/`;
        break;
    }
    
    const { category , ...cleanFormData} = formData;
    const data = await createListing(cleanFormData, endpoint)
    await connectImagesById(data, imageFiles)
    return data;
}
