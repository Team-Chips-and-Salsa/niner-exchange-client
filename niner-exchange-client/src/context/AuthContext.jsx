import React, { createContext, useState, useEffect, useContext } from 'react';
import { auth } from '../firebase';
import {
    signInWithCustomToken,
    onAuthStateChanged,
    signOut,
} from 'firebase/auth';
import { loginUser as apiLogin } from '../services/api';

// Create the context
export const AuthContext = createContext();

// Create a custom hook to use the context easily
export function useAuth() {
    return useContext(AuthContext);
}

// Create the Provider component
export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true); // To check if auth state is loaded

    // The login function that the form will call
    const login = async (email, password) => {
        if (!auth) {
            throw new Error(
                'Firebase is not configured. Please set VITE_FIREBASE_* env vars.',
            );
        }
        // Get tokens from Django backend
        const { django_tokens, firebase_token } = await apiLogin(
            email,
            password,
        );

        // Store the Django token for future API calls
        localStorage.setItem('django_access_token', django_tokens.access);

        // Use the Firebase token to sign in to Firebase
        await signInWithCustomToken(auth, firebase_token);
    };

    const logout = () => {
        if (auth) {
            signOut(auth);
        }
        localStorage.removeItem('django_access_token');
    };

    // Listen for changes in Firebase auth state
    useEffect(() => {
        if (!auth) {
            // Firebase not initialized yet; don’t block UI
            setLoading(false);
            return;
        }
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });
        return unsubscribe; // Cleanup on unmount
    }, []);

    const value = {
        currentUser,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {loading ? (
                <div
                    style={{
                        color: 'red',
                        textAlign: 'center',
                        marginTop: '2rem',
                    }}
                >
                    Loading authentication state...
                </div>
            ) : (
                children
            )}
        </AuthContext.Provider>
    );
}
