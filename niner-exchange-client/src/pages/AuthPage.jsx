import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate, useLocation } from 'react-router-dom';
import LeftSide from '../components/auth/LeftSide.jsx';
import RightSide from '../components/auth/RightSide.jsx'; // This will be the "Form Switcher"

export default function NinerExchangeAuth() {
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState('');
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
        try {
            await register(name, email, password);
        } catch (err) {
            setError('Failed to create account. Please try again.');
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-950">
            <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
                <LeftSide />
                <RightSide
                    isLogin={isLogin}
                    setIsLogin={setIsLogin}
                    onLoginSubmit={handleLogin}
                    onRegisterSubmit={handleRegister}
                    error={error}
                />
            </div>
        </div>
    );
}
