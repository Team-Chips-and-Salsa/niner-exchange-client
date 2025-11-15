const BASE_URL = import.meta.env.VITE_BASE_URL;

/**
 * Fetch a user's profile by ID.
 * @param {string|number} userId
 * @returns {Promise<Object>} User profile data
 */
export async function fetchUserProfile(userId) {
    console.log(`[API] 1. Attempting to fetch profile for userId: ${userId}`);
    const token = localStorage.getItem('django_access_token');

    if (!token) {
        console.error("[API] 2. ERROR: No token found. Unauthorized.");
        throw new Error('Unauthorized');
    }

    console.log("[API] 2. Token found. Continuing.");
    const url = `${BASE_URL}/api/users/${userId}/`;
    console.log(`[API] 3. Fetching from URL: ${url}`);

    try {
        const response = await fetch(url, {
            headers: { Authorization: `Bearer ${token}` },
        });

        console.log(`[API] 4. Received response status: ${response.status}`);

        if (!response.ok) {
            console.error(`[API] 5. ERROR: Response not OK. Status: ${response.status}`);
            throw new Error(`Failed to fetch user profile: ${response.status}`);
        }

        // Call .json() ONCE, store it, then log and return it.
        const data = await response.json();

        console.log('[API] 5. SUCCESS: Successfully fetched data:', data);
        return data; // Return the stored data

    } catch (error) {
        console.error("[API] 6. CRITICAL ERROR: A network or fetch error occurred:", error);
        throw error; // Re-throw so the component's .catch() can see it
    }
}