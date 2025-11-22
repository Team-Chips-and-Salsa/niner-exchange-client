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

    let response;
    try {
        response = await fetch(url, {
            headers: { Authorization: `Bearer ${token}` },
        });

        console.log(`[API] 4. Received response status: ${response.status}`);

        // Read the JSON body once, whether the response is ok or not.
        const responseData = await response.json(); 
        
        if (!response.ok) {
            // Check if the API returned a specific error message (e.g., from Django)
            const errorDetail = responseData.detail || response.statusText;
            
            console.error(`[API] 5. ERROR: Response not OK. Status: ${response.status} - Detail: ${errorDetail}`);
            throw new Error(`Failed to fetch user profile (${response.status}): ${errorDetail}`);
        }

        console.log('[API] 5. SUCCESS: Successfully fetched data:', responseData);
        return responseData; // Return the successfully fetched data

    } catch (error) {
        // This catches network errors, JSON parsing errors, or the re-thrown error above.
        // If response is defined, it means the request went out, but something went wrong 
        // with processing the body or the status code.
        console.error("[API] 6. CRITICAL ERROR: A network, JSON parse, or fetch error occurred:", error);
        throw error; // Re-throw the error for the component to handle
    }
}

export async function fetchCurrentListings(userID) {
    const token = localStorage.getItem('django_access_token');

    if (!token) {
        throw new Error('Unauthorized ');
    }

  const response = await fetch(`${BASE_URL}/api/users/current-listings/${userID}/`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`, // JWT or session token
      'Content-Type': 'application/json',
    },
  });
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

  const response = await fetch(`${BASE_URL}/api/users/sold-listings/${userID}/`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`, // JWT or session token
      'Content-Type': 'application/json',
    },
  });
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

  const response = await fetch(`${BASE_URL}/api/users/purchase-history/${userID}/`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`, // JWT or session token
      'Content-Type': 'application/json',
    },
  });
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
            'Authorization': `Bearer ${token}`,
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