import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';

export default function RegisterForm({ onSubmit }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ name, email, password });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            <div>
                <label className="block text-sm font-medium text-emerald-50 mb-2">
                    Full Name
                </label>
                <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-600" />
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your Name"
                        className="w-full pl-12 pr-4 py-3 sm:py-4 bg-white rounded-xl border-2 border-transparent focus:border-amber-400 focus:outline-none transition-all text-emerald-900 placeholder-emerald-400 text-sm sm:text-base"
                    />
                </div>
            </div>

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
                    />
                </div>
            </div>

            <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-400 to-amber-500 text-emerald-900 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:from-amber-500 hover:to-amber-600 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
            >
                Create Account
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
        </form>
    );
}
