/*
 * Used AI to improve login/register flow and security
 * */

import React, { createContext, useState, useEffect, useContext } from 'react';
import { Loader2 } from 'lucide-react';
import { auth } from '../firebase';
import {
    signInWithCustomToken,
    onAuthStateChanged,
    signOut,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import {
    apiLogin,
    apiLogout,
    apiRegister,
    apiGetMe,
} from '../services/auth.js';

export const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Django login AND Firebase login
    const login = async (email, password) => {
        const { django_tokens, firebase_token } = await apiLogin(
            email,
            password,
        );

        localStorage.setItem('django_access_token', django_tokens.access);
        localStorage.setItem('django_refresh_token', django_tokens.refresh);

        await signInWithCustomToken(auth, firebase_token);
    };

    // Django registration
    const register = async (name, email, password) => {
        const data = await apiRegister(name, email, password);
        return data.message;
    };

    // Handles Django logout AND Firebase logout
    const logout = async () => {
        const accessToken = localStorage.getItem('django_access_token');
        const refreshToken = localStorage.getItem('django_refresh_token');
        await apiLogout(accessToken, refreshToken);

        localStorage.removeItem('django_access_token');
        localStorage.removeItem('django_refresh_token');

        if (auth) {
            await signOut(auth);
        }
    };

    useEffect(() => {
        if (!auth) {
            setLoading(false);
            return;
        }

        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                try {
                    const djangoUser = await apiGetMe();
                    setCurrentUser(djangoUser);
                } catch (e) {
                    console.error('Session invalid, logging out:', e);
                    await logout();
                }
            } else {
                setCurrentUser(null);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const refreshUser = async () => {
        try {
            const djangoUser = await apiGetMe();
            setCurrentUser(djangoUser);
        } catch (e) {
            console.error('Failed to refresh user:', e);
        }
    };

    const value = {
        currentUser,
        loading,
        login,
        register,
        logout,
        refreshUser,
    };

    return (
        <AuthContext.Provider value={value}>
            {loading ? (
                <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
                    <Loader2 className="h-12 w-12 animate-spin text-emerald-600" />
                    <p className="text-xl font-medium text-gray-600">
                        Loading Authentication...
                    </p>
                </div>
            ) : (
                children
            )}
        </AuthContext.Provider>
    );
}
