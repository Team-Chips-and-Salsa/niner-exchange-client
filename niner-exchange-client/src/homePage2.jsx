import React, { useState } from 'react';
import { Search, BookOpen, Home, Package, Briefcase, Shield, Star, MessageCircle, ChevronRight, Crown, Bell, User, Award, CheckCircle } from 'lucide-react';

export default function NinerExchangeHome() {
    const [activeCategory, setActiveCategory] = useState('all');

    const categories = [
        { id: 'all', title: 'All', icon: Package },
        { id: 'textbooks', title: 'Textbooks', icon: BookOpen },
        { id: 'sublease', title: 'Housing', icon: Home },
        { id: 'marketplace', title: 'Marketplace', icon: Package },
        { id: 'services', title: 'Services', icon: Briefcase }
    ];

    const recentListings = [
        { id: 1, title: 'Calculus III Textbook', price: 45, category: 'textbooks', image: '📚', verified: true, condition: 'Like New' },
        { id: 2, title: '2BR Apartment Spring Sublease', price: 650, category: 'sublease', image: '🏠', verified: true, condition: 'Available' },
        { id: 3, title: 'MacBook Pro 2020 M1', price: 800, category: 'marketplace', image: '💻', verified: true, condition: 'Good' },
        { id: 4, title: 'Math & Physics Tutoring', price: 25, category: 'services', image: '👨‍🏫', verified: true, condition: 'per hour' },
        { id: 5, title: 'Chemistry Lab Manual 2025', price: 30, category: 'textbooks', image: '📖', verified: true, condition: 'Used' },
        { id: 6, title: 'Mini Fridge - Excellent', price: 50, category: 'marketplace', image: '❄️', verified: true, condition: 'Excellent' },
        { id: 7, title: 'iPhone 13 Pro', price: 600, category: 'marketplace', image: '📱', verified: true, condition: 'Good' },
        { id: 8, title: 'Studio Apartment Summer', price: 550, category: 'sublease', image: '🏘️', verified: true, condition: 'Available' },
        { id: 9, title: 'Economics Textbook Bundle', price: 85, category: 'textbooks', image: '📊', verified: true, condition: 'Good' },
        { id: 10, title: 'Moving Help Service', price: 40, category: 'services', image: '🚚', verified: true, condition: 'Available' },
        { id: 11, title: 'Gaming Chair', price: 120, category: 'marketplace', image: '🪑', verified: true, condition: 'Like New' },
        { id: 12, title: 'Spanish Tutoring', price: 20, category: 'services', image: '🗣️', verified: true, condition: 'per hour' }
    ];

    const filteredListings = activeCategory === 'all'
        ? recentListings
        : recentListings.filter(listing => listing.category === activeCategory);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Header */}
            <header className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white sticky top-0 z-50 shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
                    <div className="flex items-center justify-between gap-8">
                        {/* Logo */}
                        <div className="flex items-center gap-3 flex-shrink-0">
                            <div className="w-12 h-12 bg-emerald-800 rounded-xl flex items-center justify-center">
                                <Crown className="w-7 h-7 text-amber-400" />
                            </div>
                            <div className="hidden sm:block">
                                <h1 className="text-2xl font-bold">Niner Exchange</h1>
                                <p className="text-xs text-emerald-100">UNCC Community Platform</p>
                            </div>
                        </div>

                        {/* Categories Navigation - Center */}
                        <nav className="hidden lg:flex items-center gap-6 flex-1 justify-center">
                            {categories.map((category) => {
                                const Icon = category.icon;
                                const isActive = activeCategory === category.id;
                                return (
                                    <button
                                        key={category.id}
                                        onClick={() => setActiveCategory(category.id)}
                                        className={`flex flex-col items-center gap-1 pb-1 px-3 border-b-2 transition-all ${
                                            isActive
                                                ? 'border-amber-400 text-white'
                                                : 'border-transparent text-emerald-100 hover:text-white hover:border-emerald-400'
                                        }`}
                                    >
                                        <Icon className="w-5 h-5" />
                                        <span className="text-xs font-medium whitespace-nowrap">{category.title}</span>
                                    </button>
                                );
                            })}
                        </nav>

                        {/* Right Side Actions */}
                        <div className="flex items-center gap-3 flex-shrink-0">
                            <button className="hidden md:flex items-center gap-2 bg-amber-400 text-emerald-900 px-4 py-2 rounded-lg font-bold hover:bg-amber-500 transition-all shadow-lg">
                                Post Listing
                            </button>
                            <button className="p-2 hover:bg-emerald-700 rounded-lg transition-colors relative">
                                <Bell className="w-5 h-5" />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>
                            <button className="p-2 hover:bg-emerald-700 rounded-lg transition-colors">
                                <MessageCircle className="w-5 h-5" />
                            </button>
                            <button className="p-2 hover:bg-emerald-700 rounded-full transition-colors">
                                <User className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Mobile Categories */}
                    <div className="lg:hidden flex items-center gap-4 overflow-x-auto pb-2 mt-4 scrollbar-hide">
                        {categories.map((category) => {
                            const Icon = category.icon;
                            const isActive = activeCategory === category.id;
                            return (
                                <button
                                    key={category.id}
                                    onClick={() => setActiveCategory(category.id)}
                                    className={`flex flex-col items-center gap-1 pb-1 px-3 border-b-2 transition-all flex-shrink-0 ${
                                        isActive
                                            ? 'border-amber-400 text-white'
                                            : 'border-transparent text-emerald-100 hover:text-white'
                                    }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span className="text-xs font-medium whitespace-nowrap">{category.title}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-emerald-700 via-emerald-600 to-emerald-500 text-white py-16 sm:py-24 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-amber-400 rounded-full -translate-x-48 -translate-y-48"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-800 rounded-full translate-x-48 translate-y-48"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
                            Welcome to Niner Exchange
                        </h2>
                        <p className="text-xl sm:text-2xl text-emerald-100 mb-8">
                            The trusted marketplace for the UNCC community
                        </p>

                        {/* Search Bar */}
                        <div className="max-w-3xl mx-auto">
                            <div className="bg-white rounded-2xl shadow-2xl p-2 flex items-center gap-2">
                                <Search className="w-6 h-6 text-gray-400 ml-4" />
                                <input
                                    type="text"
                                    placeholder="Search for textbooks, housing, items, or services..."
                                    className="flex-1 px-4 py-4 text-gray-900 focus:outline-none text-lg"
                                />
                                <button className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-8 py-4 rounded-xl font-bold hover:from-emerald-700 hover:to-emerald-800 transition-all">
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 text-center">
                            <Shield className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-2 text-amber-300" />
                            <div className="text-2xl sm:text-3xl font-bold mb-1">5,000+</div>
                            <div className="text-sm sm:text-base text-emerald-100">Active Users</div>
                        </div>
                        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 text-center">
                            <Star className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-2 text-amber-300" />
                            <div className="text-2xl sm:text-3xl font-bold mb-1">15,000+</div>
                            <div className="text-sm sm:text-base text-emerald-100">Transactions</div>
                        </div>
                        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 text-center">
                            <Award className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-2 text-amber-300" />
                            <div className="text-2xl sm:text-3xl font-bold mb-1">4.8/5</div>
                            <div className="text-sm sm:text-base text-emerald-100">Trust Score</div>
                        </div>
                        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 text-center">
                            <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-2 text-amber-300" />
                            <div className="text-2xl sm:text-3xl font-bold mb-1">98%</div>
                            <div className="text-sm sm:text-base text-emerald-100">Success Rate</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Listings Section */}
            <section className="py-16 sm:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-3xl font-bold text-gray-900 mb-2">
                                {activeCategory === 'all' ? 'All Listings' : categories.find(c => c.id === activeCategory)?.title}
                            </h3>
                            <p className="text-gray-600">Fresh opportunities from your peers - {filteredListings.length} listings</p>
                        </div>
                        <button className="text-emerald-600 font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                            View All <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredListings.map((listing) => (
                            <div
                                key={listing.id}
                                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden group cursor-pointer"
                            >
                                <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-48 flex items-center justify-center text-6xl group-hover:scale-105 transition-transform relative">
                                    {listing.image}
                                    {listing.verified && (
                                        <div className="absolute top-3 right-3 bg-emerald-600 text-white p-1 rounded-full">
                                            <CheckCircle className="w-4 h-4" />
                                        </div>
                                    )}
                                </div>
                                <div className="p-5">
                                    <h4 className="font-bold text-gray-900 text-lg mb-1 line-clamp-1">{listing.title}</h4>
                                    <p className="text-sm text-gray-500 mb-3">{listing.condition}</p>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <span className="text-2xl font-bold text-emerald-600">${listing.price}</span>
                                            {listing.category === 'services' && <span className="text-sm text-gray-500">/hr</span>}
                                            {listing.category === 'sublease' && <span className="text-sm text-gray-500">/mo</span>}
                                        </div>
                                        <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors">
                                            View
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mobile Post Button */}
            <button className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-500 text-emerald-900 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-40 font-bold text-2xl">
                +
            </button>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <Crown className="w-6 h-6 text-amber-400" />
                                <h4 className="font-bold text-lg">Niner Exchange</h4>
                            </div>
                            <p className="text-gray-400 text-sm">
                                The trusted marketplace for the UNCC community
                            </p>
                        </div>
                        <div>
                            <h5 className="font-bold mb-4">Categories</h5>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Textbooks</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Sub-leasing</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Marketplace</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Services</a></li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="font-bold mb-4">Support</h5>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Safety Tips</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Report Issue</a></li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="font-bold mb-4">Legal</h5>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Community Guidelines</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
                        <p>© 2025 Niner Exchange. All rights reserved. Built for UNCC students, by UNCC students.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}