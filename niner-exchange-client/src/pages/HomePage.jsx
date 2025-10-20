import React, { useEffect, useState } from 'react';
import {
    Search,
    BookOpen,
    Home,
    Package,
    Briefcase,
    Shield,
    Star,
    MessageCircle,
    ChevronRight,
    Crown,
    Bell,
    User,
    Award,
    CheckCircle,
} from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import Footer from '../components/Footer.jsx';

/*Used AI to help generate the tailwind css based off our team's figma design*/
export default function HomePage() {
    const [activeCategory, setActiveCategory] = useState('all');

    const [isDesktop, setIsDesktop] = useState(() => {
        if (typeof window === 'undefined') return true;
        return window.innerWidth >= 768;
    });

    useEffect(() => {
        function handleResize() {
            if (typeof window === 'undefined') return;
            setIsDesktop(window.innerWidth >= 768);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const categories = [
        { id: 'all', title: 'All', icon: Package },
        { id: 'textbooks', title: 'Textbooks', icon: BookOpen },
        { id: 'sublease', title: 'Housing', icon: Home },
        { id: 'marketplace', title: 'Marketplace', icon: Package },
        { id: 'services', title: 'Services', icon: Briefcase },
    ];

    const recentListings = [
        {
            id: 1,
            title: 'Calculus III Textbook',
            price: 45,
            category: 'textbooks',
            image: '📚',
            verified: true,
            condition: 'Like New',
        },
        {
            id: 2,
            title: '2BR Apartment Spring Sublease',
            price: 650,
            category: 'sublease',
            image: '🏠',
            verified: true,
            condition: 'Available',
        },
        {
            id: 3,
            title: 'MacBook Pro 2020 M1',
            price: 800,
            category: 'marketplace',
            image: '💻',
            verified: true,
            condition: 'Good',
        },
        {
            id: 4,
            title: 'Math & Physics Tutoring',
            price: 25,
            category: 'services',
            image: '👨‍🏫',
            verified: true,
            condition: 'per hour',
        },
        {
            id: 5,
            title: 'Chemistry Lab Manual 2025',
            price: 30,
            category: 'textbooks',
            image: '📖',
            verified: true,
            condition: 'Used',
        },
        {
            id: 6,
            title: 'Mini Fridge - Excellent',
            price: 50,
            category: 'marketplace',
            image: '❄️',
            verified: true,
            condition: 'Excellent',
        },
        {
            id: 7,
            title: 'iPhone 13 Pro',
            price: 600,
            category: 'marketplace',
            image: '📱',
            verified: true,
            condition: 'Good',
        },
        {
            id: 8,
            title: 'Studio Apartment Summer',
            price: 550,
            category: 'sublease',
            image: '🏘️',
            verified: true,
            condition: 'Available',
        },
        {
            id: 9,
            title: 'Economics Textbook Bundle',
            price: 85,
            category: 'textbooks',
            image: '📊',
            verified: true,
            condition: 'Good',
        },
        {
            id: 10,
            title: 'Moving Help Service',
            price: 40,
            category: 'services',
            image: '🚚',
            verified: true,
            condition: 'Available',
        },
        {
            id: 11,
            title: 'Gaming Chair',
            price: 120,
            category: 'marketplace',
            image: '🪑',
            verified: true,
            condition: 'Like New',
        },
        {
            id: 12,
            title: 'Spanish Tutoring',
            price: 20,
            category: 'services',
            image: '🗣️',
            verified: true,
            condition: 'per hour',
        },
    ];

    const filteredListings =
        activeCategory === 'all'
            ? recentListings
            : recentListings.filter(
                  (listing) => listing.category === activeCategory,
              );

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Header */}
            <PageHeader showCategories={true} />

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
                </div>
            </section>

            {/* Listings Section */}
            <section className="py-16 sm:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-3xl font-bold text-gray-900 mb-2">
                                {activeCategory === 'all'
                                    ? 'All Listings'
                                    : categories.find(
                                          (c) => c.id === activeCategory,
                                      )?.title}
                            </h3>
                            <p className="text-gray-600">
                                Fresh opportunities from your peers -{' '}
                                {filteredListings.length} listings
                            </p>
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
                                    <h4 className="font-bold text-gray-900 text-lg mb-1 line-clamp-1">
                                        {listing.title}
                                    </h4>
                                    {(listing.category === 'textbooks' ||
                                        listing.category === 'marketplace') &&
                                        listing.condition && (
                                            <p className="text-sm text-gray-500 mb-3">
                                                {listing.condition}
                                            </p>
                                        )}
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <span className="text-2xl font-bold text-emerald-600">
                                                ${listing.price}
                                            </span>
                                            {listing.category ===
                                                'services' && (
                                                <span className="text-sm text-gray-500">
                                                    /hr
                                                </span>
                                            )}
                                            {listing.category ===
                                                'sublease' && (
                                                <span className="text-sm text-gray-500">
                                                    /mo
                                                </span>
                                            )}
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
            <Footer />
        </div>
    );
}
