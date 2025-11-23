const BASE_URL = import.meta.env.VITE_BASE_URL;

import { fetchWithAuth } from './auth';

export async function connectImagesById(listing_id, imageFiles) {
    let formData = new FormData();
    formData.append('listing', listing_id);
    for (let i = 0; i < imageFiles.length; i++) {
        let file = imageFiles[i];
        formData.append('image', file);
        formData.append('upload_order', i + 1);
    }

    await fetchWithAuth(`${BASE_URL}/api/images/`, {
        method: 'POST',
        mode: 'cors',
        body: formData,
    });
}
