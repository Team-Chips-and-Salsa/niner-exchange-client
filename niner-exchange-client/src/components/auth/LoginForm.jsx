import React, { useState } from 'react';
import { Mail, Lock, ArrowRight } from 'lucide-react';

export default function LoginForm({ onSubmit, isLoading }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ email, password });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            <div>
                <label className="block text-sm font-medium text-emerald-50 mb-2">
                    Student Email Address
                </label>
                <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-600" />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="youremail@charlotte.edu"
                        className="w-full pl-12 pr-4 py-3 sm:py-4 bg-white rounded-xl border-2 border-transparent focus:border-amber-400 focus:outline-none transition-all text-emerald-900 placeholder-emerald-400 text-sm sm:text-base"
                        required
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
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-12 pr-4 py-3 sm:py-4 bg-white rounded-xl border-2 border-transparent focus:border-amber-400 focus:outline-none transition-all text-emerald-900 placeholder-emerald-400 text-sm sm:text-base"
                        required
                    />
                </div>
            </div>

            <div className="flex items-center justify-between text-xs sm:text-sm">
                <button
                    type="button"
                    className="text-amber-300 hover:text-amber-200 transition-colors"
                >
                    Forgot password?
                </button>
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-amber-400 to-amber-500 text-emerald-900 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:from-amber-500 hover:to-amber-600 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {isLoading ? 'Signing In...' : 'Sign In'}
                {!isLoading && (
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                )}
            </button>
        </form>
    );
}
