const BASE_URL = import.meta.env.VITE_BASE_URL;

// Logs in to Django, gets Django + Firebase tokens
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

//Registers with Django, returns a success message
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
        let errorMsg = 'Registration failed. Please try again.'; // Default

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

//Fetches the full Django user profile
export async function apiGetMe(token) {
    const response = await fetch(`${BASE_URL}/api/auth/get-me/`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch user profile');
    }
    return await response.json();
}

//Blacklists the Django refresh token
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
