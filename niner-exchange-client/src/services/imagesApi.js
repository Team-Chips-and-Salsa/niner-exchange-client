const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function connectImagesById(listing_id, imageFiles) {
    const token = localStorage.getItem('django_access_token');

    if (!token) {
        throw new Error("Unauthorized");
    }

    let formData = new FormData();
    formData.append('listing', listing_id)
    for(let i = 0; i < imageFiles.length; i++) {
        let file = imageFiles[i];
        formData.append('image', file);
        formData.append('upload_order', i + 1)
    }

    const response = await fetch(`${BASE_URL}/api/images/`, {
        headers: {Authorization: `Bearer ${token}`},
        method: 'POST',
        mode: 'cors',
        body: formData
    })

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
}