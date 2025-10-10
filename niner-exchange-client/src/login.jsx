import React, { useState, useEffect } from 'react';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import NinerExchangeLogo from './assets/logoTestNiner.png';
import idea from './assets/ideaaa.png';
import { useAuth } from './context/AuthContext.jsx';
import { useNavigate, useLocation } from 'react-router-dom';

export default function NinerExchangeAuth() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const { login, currentUser } = useAuth();
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (currentUser) {
            const from = location.state?.from?.pathname || '/messages';
            navigate(from, { replace: true });
        }
    }, [currentUser, navigate, location]);

    const handleSubmit = async () => {
        setError('');
        try {
            await login(email, password);
            // Redirect to the page the user tried to access, or default to messages
            const from = location.state?.from?.pathname || '/messages';
            navigate(from, { replace: true });
        } catch (err) {
            setError('Failed to log in. Please check your credentials.');
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-950">
            {/* Error display */}
            {error && (
                <div className="bg-red-100 text-red-700 p-2 mb-4 rounded text-center max-w-md mx-auto">
                    {error}
                </div>
            )}
            <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
                {/* Left Side - Info Section */}
                <div className="bg-gradient-to-br from-emerald-50 to-amber-50 p-6 sm:p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-200 rounded-full opacity-20 -translate-y-32 translate-x-32"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-200 rounded-full opacity-20 translate-y-24 -translate-x-24"></div>

                    <div className="relative z-10 max-w-xl mx-auto w-full">
                        {/* Logo Section */}
                        <div className="mb-8 md:mb-12">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-700 to-emerald-900 rounded-2xl flex items-center justify-center shadow-lg">
                                    <img
                                        src={NinerExchangeLogo}
                                        alt="Niner Exchange Logo"
                                        className="w-10 h-10 sm:w-14 sm:h-14 object-contain"
                                    />
                                </div>
                                <div>
                                    <h1 className="text-2xl sm:text-3xl font-bold text-emerald-900">
                                        Niner Exchange
                                    </h1>
                                    <p className="text-xs sm:text-sm text-emerald-700">
                                        UNCC Community Platform
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Diagram Section */}
                        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg mb-6 md:mb-8">
                            <img
                                src={idea}
                                alt="Niner Exchange Logo"
                                className=""
                            />
                        </div>
                    </div>
                </div>

                {/* Right Side - Auth Form */}
                <div className="bg-gradient-to-br from-emerald-700 to-emerald-900 p-6 sm:p-8 md:p-12 flex flex-col justify-center relative overflow-hidden">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400 rounded-full opacity-10 -translate-y-48 translate-x-48"></div>
                    <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-600 rounded-full opacity-10 translate-y-36 -translate-x-36"></div>

                    <div className="relative z-10 max-w-md mx-auto w-full">
                        {/* Welcome Header */}
                        <div className="text-center mb-8 sm:mb-10">
                            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                                {isLogin ? 'Welcome Back' : 'Join Us'}
                            </h2>
                            <p className="text-sm sm:text-base text-emerald-100">
                                {isLogin
                                    ? 'Sign in to your account'
                                    : 'Create your account'}
                            </p>
                        </div>

                        {/* Form */}
                        <div className="space-y-5 sm:space-y-6">
                            {!isLogin && (
                                <div>
                                    <label className="block text-sm font-medium text-emerald-50 mb-2">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-600" />
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) =>
                                                setName(e.target.value)
                                            }
                                            placeholder="John Doe"
                                            className="w-full pl-12 pr-4 py-3 sm:py-4 bg-white rounded-xl border-2 border-transparent focus:border-amber-400 focus:outline-none transition-all text-emerald-900 placeholder-emerald-400 text-sm sm:text-base"
                                        />
                                    </div>
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-emerald-50 mb-2">
                                    Student Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-600" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        placeholder="youremail@uncc.edu"
                                        className="w-full pl-12 pr-4 py-3 sm:py-4 bg-white rounded-xl border-2 border-transparent focus:border-amber-400 focus:outline-none transition-all text-emerald-900 placeholder-emerald-400 text-sm sm:text-base"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-emerald-50 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-600" />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        placeholder="••••••••"
                                        className="w-full pl-12 pr-4 py-3 sm:py-4 bg-white rounded-xl border-2 border-transparent focus:border-amber-400 focus:outline-none transition-all text-emerald-900 placeholder-emerald-400 text-sm sm:text-base"
                                    />
                                </div>
                            </div>

                            {isLogin && (
                                <div className="flex items-center justify-between text-xs sm:text-sm">
                                    <label className="flex items-center text-emerald-50 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="mr-2 rounded"
                                        />
                                        Remember me
                                    </label>
                                    <button
                                        type="button"
                                        className="text-amber-300 hover:text-amber-200 transition-colors"
                                    >
                                        Forgot password?
                                    </button>
                                </div>
                            )}

                            <button
                                onClick={handleSubmit}
                                className="w-full bg-gradient-to-r from-amber-400 to-amber-500 text-emerald-900 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:from-amber-500 hover:to-amber-600 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
                            >
                                {isLogin ? 'Sign In' : 'Create Account'}
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>

                        {/* Toggle Login/Register */}
                        <div className="mt-6 sm:mt-8 text-center">
                            <p className="text-sm sm:text-base text-emerald-100">
                                {isLogin
                                    ? "Don't have an account?"
                                    : 'Already have an account?'}
                                <button
                                    onClick={() => setIsLogin(!isLogin)}
                                    className="ml-2 text-amber-300 hover:text-amber-200 font-semibold transition-colors underline"
                                >
                                    {isLogin ? 'Sign Up' : 'Login'}
                                </button>
                            </p>
                        </div>

                        {/* Additional Info */}
                        {!isLogin && (
                            <div className="mt-4 sm:mt-6 p-4 bg-emerald-800 bg-opacity-50 rounded-xl">
                                <p className="text-xs sm:text-sm text-emerald-50 text-center">
                                    By signing up, you agree to support the UNCC
                                    community with respect and integrity.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
