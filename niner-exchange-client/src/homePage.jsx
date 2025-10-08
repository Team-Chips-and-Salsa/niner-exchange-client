import React, { useState } from 'react';
import { Search, BookOpen, Home, Package, Briefcase, Shield, Star, DollarSign, MessageCircle, TrendingUp, Users, ChevronRight, Crown, Menu, X, Award, CheckCircle } from 'lucide-react';

export default function NinerExchangeHomee() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState('all');

    const categories = [
        {
            id: 'textbooks',
            title: 'Used Textbooks',
            icon: BookOpen,
            description: 'Find affordable textbooks from fellow students',
            color: 'from-blue-500 to-blue-600',
            features: ['ISBN Search', 'Course Number Filter', 'Price Comparison']
        },
        {
            id: 'sublease',
            title: 'Sub-leasing Hub',
            icon: Home,
            description: 'Discover and post sublease opportunities',
            color: 'from-emerald-500 to-emerald-600',
            features: ['Verified Listings', 'Flexible Terms', 'Secure Payments']
        },
        {
            id: 'marketplace',
            title: 'Marketplace',
            icon: Package,
            description: 'Buy and sell items within the UNCC community',
            color: 'from-purple-500 to-purple-600',
            features: ['Photo Uploads', 'Safe Meetups', 'Price Negotiation']
        },
        {
            id: 'services',
            title: 'Services',
            icon: Briefcase,
            description: 'Offer or find tutoring, moving help, and more',
            color: 'from-amber-500 to-amber-600',
            features: ['Tutoring', 'Moving Help', 'Event Services']
        }
    ];

    const features = [
        {
            icon: Shield,
            title: 'SheerID Verification',
            description: 'Every user is a verified UNCC student, faculty, or staff member'
        },
        {
            icon: Star,
            title: 'Trust Score System',
            description: 'Rate transactions based on communication, punctuality, and fairness'
        },
        {
            icon: DollarSign,
            title: 'Fair Price Calculator',
            description: 'Compare prices across platforms to ensure fair deals'
        },
        {
            icon: MessageCircle,
            title: 'In-App Messaging',
            description: 'Secure communication between buyers and sellers'
        }
    ];

    const stats = [
        { label: 'Active Users', value: '5,000+', icon: Users },
        { label: 'Transactions', value: '15,000+', icon: TrendingUp },
        { label: 'Trust Score', value: '4.8/5', icon: Award },
        { label: 'Success Rate', value: '98%', icon: CheckCircle }
    ];

    const recentListings = [
        { id: 1, title: 'Calculus Textbook 9th Ed', price: 45, category: 'textbooks', image: '📚', verified: true },
        { id: 2, title: '2BR Apartment - Spring', price: 650, category: 'sublease', image: '🏠', verified: true },
        { id: 3, title: 'MacBook Pro 2020', price: 800, category: 'marketplace', image: '💻', verified: true },
        { id: 4, title: 'Math Tutoring Service', price: 25, category: 'services', image: '👨‍🏫', verified: true },
        { id: 5, title: 'Chemistry Lab Manual', price: 30, category: 'textbooks', image: '📖', verified: true },
        { id: 6, title: 'Mini Fridge', price: 50, category: 'marketplace', image: '❄️', verified: true }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Header */}
            <header className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white sticky top-0 z-50 shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-emerald-800 rounded-xl flex items-center justify-center">
                                <Crown className="w-7 h-7 text-amber-400" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold">Niner Exchange</h1>
                                <p className="text-xs text-emerald-100">UNCC Community Platform</p>
                            </div>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-6">
                            <a href="#" className="text-sm font-medium hover:text-amber-300 transition-colors">Dashboard</a>
                            <a href="#" className="text-sm font-medium hover:text-amber-300 transition-colors">Messages</a>
                            <a href="#" className="text-sm font-medium hover:text-amber-300 transition-colors">My Listings</a>
                            <button className="bg-amber-400 text-emerald-900 px-6 py-2 rounded-lg font-bold hover:bg-amber-500 transition-all shadow-lg">
                                Post Listing
                            </button>
                        </nav>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 hover:bg-emerald-700 rounded-lg transition-colors"
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>

                    {/* Mobile Navigation */}
                    {mobileMenuOpen && (
                        <nav className="md:hidden mt-4 pb-4 space-y-2">
                            <a href="#" className="block px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors">Dashboard</a>
                            <a href="#" className="block px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors">Messages</a>
                            <a href="#" className="block px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors">My Listings</a>
                            <button className="w-full bg-amber-400 text-emerald-900 px-4 py-2 rounded-lg font-bold hover:bg-amber-500 transition-all">
                                Post Listing
                            </button>
                        </nav>
                    )}
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
                        {stats.map((stat, index) => (
                            <div key={index} className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 text-center">
                                <stat.icon className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-2 text-amber-300" />
                                <div className="text-2xl sm:text-3xl font-bold mb-1">{stat.value}</div>
                                <div className="text-sm sm:text-base text-emerald-100">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-16 sm:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-12">
                        <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                            Explore Categories
                        </h3>
                        <p className="text-lg text-gray-600">
                            Everything you need in one trusted platform
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {categories.map((category) => {
                            const Icon = category.icon;
                            return (
                                <div
                                    key={category.id}
                                    className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all cursor-pointer border-2 border-transparent hover:border-emerald-500"
                                >
                                    <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                        <Icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h4 className="text-xl font-bold text-gray-900 mb-2">{category.title}</h4>
                                    <p className="text-gray-600 mb-4">{category.description}</p>
                                    <div className="space-y-2">
                                        {category.features.map((feature, idx) => (
                                            <div key={idx} className="flex items-center gap-2 text-sm text-gray-500">
                                                <CheckCircle className="w-4 h-4 text-emerald-600" />
                                                <span>{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <button className="mt-4 text-emerald-600 font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                                        Browse <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 sm:py-20 bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-12">
                        <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                            Why Choose Niner Exchange?
                        </h3>
                        <p className="text-lg text-gray-600">
                            Built with safety, trust, and community in mind
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <div key={index} className="text-center">
                                    <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <Icon className="w-10 h-10 text-emerald-700" />
                                    </div>
                                    <h4 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h4>
                                    <p className="text-gray-600">{feature.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Recent Listings */}
            <section className="py-16 sm:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-3xl font-bold text-gray-900 mb-2">Recent Listings</h3>
                            <p className="text-gray-600">Fresh opportunities from your peers</p>
                        </div>
                        <button className="text-emerald-600 font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                            View All <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {recentListings.map((listing) => (
                            <div
                                key={listing.id}
                                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden group cursor-pointer"
                            >
                                <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-48 flex items-center justify-center text-6xl group-hover:scale-105 transition-transform">
                                    {listing.image}
                                </div>
                                <div className="p-5">
                                    <div className="flex items-start justify-between mb-2">
                                        <h4 className="font-bold text-gray-900 text-lg">{listing.title}</h4>
                                        {listing.verified && (
                                            <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                                        )}
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-2xl font-bold text-emerald-600">${listing.price}</span>
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

            {/* CTA Section */}
            <section className="py-16 sm:py-20 bg-gradient-to-r from-emerald-600 to-emerald-700">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center text-white">
                    <h3 className="text-3xl sm:text-4xl font-bold mb-4">
                        Ready to Get Started?
                    </h3>
                    <p className="text-xl text-emerald-100 mb-8">
                        Join thousands of UNCC students, faculty, and staff in our trusted community
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-amber-400 text-emerald-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-amber-500 transition-all shadow-lg hover:shadow-xl">
                            Create Account
                        </button>
                        <button className="bg-white text-emerald-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-lg">
                            Learn More
                        </button>
                    </div>
                </div>
            </section>

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