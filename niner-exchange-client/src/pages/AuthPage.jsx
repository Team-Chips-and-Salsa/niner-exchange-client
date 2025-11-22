/*
 * Used AI to figure out how to validate registration with email
 * */

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate, useLocation } from 'react-router-dom';
import LeftSide from '../components/auth/LeftSide.jsx';
import RightSide from '../components/auth/RightSide.jsx';

export default function NinerExchangeAuth() {
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const { login, register, currentUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (currentUser) {
            const from = location.state?.from?.pathname || '/home';
            navigate(from, { replace: true });
        }
    }, [currentUser, navigate, location]);

    // Handle LOGIN submission
    const handleLogin = async ({ email, password }) => {
        setError('');
        try {
            await login(email, password);
        } catch (err) {
            setError('Failed to log in. Please check your credentials.');
            console.error(err);
        }
    };

    // Handle REGISTER submission
    const handleRegister = async ({ name, email, password }) => {
        setError('');
        setSuccessMessage('');
        try {
            const message = await register(name, email, password);
            setSuccessMessage(message);
            setIsLogin(true);
        } catch (err) {
            setError(err.message || 'Failed to create account.');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-950">
            <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
                <div className="hidden md:block">
                    <LeftSide />
                </div>
                <RightSide
                    isLogin={isLogin}
                    setIsLogin={setIsLogin}
                    onLoginSubmit={handleLogin}
                    onRegisterSubmit={handleRegister}
                    error={error}
                    successMessage={successMessage}
                />
            </div>
        </div>
    );
}
