const BASE_URL = import.meta.env.VITE_BASE_URL;

let refreshPromise = null;

// gets Django + Firebase tokens
export async function apiLogin(email, password) {
    const response = await fetch(`${BASE_URL}/api/auth/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Login failed');
    }
    return await response.json();
}

// registers with Django, returns a success message
export async function apiRegister(name, email, password) {
    const nameParts = name.split(' ');
    const first_name = nameParts[0];
    const last_name = nameParts.slice(1).join(' ') || first_name;

    const response = await fetch(`${BASE_URL}/api/auth/register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, first_name, last_name }),
    });
    if (!response.ok) {
        const err = await response.json();
        let errorMsg = 'Registration failed. Please try again.';

        if (typeof err === 'object' && err !== null && !Array.isArray(err)) {
            const errorKey = Object.keys(err)[0];
            if (
                errorKey &&
                Array.isArray(err[errorKey]) &&
                err[errorKey].length > 0
            ) {
                errorMsg = err[errorKey][0];
            }
        }
        throw new Error(errorMsg);
    }
    return await response.json();
}

// Silent Refresh
export async function apiRefreshToken() {
    const refreshToken = localStorage.getItem('django_refresh_token');
    if (!refreshToken) {
        throw new Error('No refresh token available');
    }

    if (refreshPromise) {
        return refreshPromise;
    }

    refreshPromise = fetch(`${BASE_URL}/api/auth/token/refresh/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh: refreshToken }),
    }).then(async (response) => {
        if (!response.ok) {
            throw new Error('Refresh token invalid');
        }

        const data = await response.json();

        localStorage.setItem('django_access_token', data.access);
        localStorage.setItem('django_refresh_token', data.refresh);

        return data.access;
    }).finally(() => {
        refreshPromise = null;
    });

    return refreshPromise;
}

// fetches the full Django user profile
export async function fetchWithAuth(url, options = {}) {
    let accessToken = localStorage.getItem('django_access_token');

    let response = await fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });

    // If it's a 401 (Unauthorized), try to refresh
    if (response.status === 401) {
        try {
            const newAccessToken = await apiRefreshToken();

            response = await fetch(url, {
                ...options,
                headers: {
                    ...options.headers,
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${newAccessToken}`,
                },
            });
        } catch (refreshError) {
            console.error('Refresh failed:', refreshError);
            throw refreshError;
        }
    }

    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.detail || 'API request failed');
    }

    return await response.json();
}

export async function apiGetMe() {
    return await fetchWithAuth(`${BASE_URL}/api/auth/get-me/`, {
        method: 'GET',
    });
}

// blacklists the Django refresh token
export async function apiLogout(accessToken, refreshToken) {
    if (!accessToken || !refreshToken) return;
    try {
        await fetch(`${BASE_URL}/api/auth/logout/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ refresh: refreshToken }),
        });
    } catch (err) {
        console.error('Failed to blacklist token:', err);
    }
}
