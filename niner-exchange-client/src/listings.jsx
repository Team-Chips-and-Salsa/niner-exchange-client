import React, { useState } from 'react';
import { Search, BookOpen, Home, Package, Briefcase, Crown, SlidersHorizontal, MapPin, DollarSign, Clock, User, Heart, Share2, Filter, Grid, List, TrendingUp } from 'lucide-react';

export default function NinerListingsBrowser() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [viewMode, setViewMode] = useState('grid');
    const [searchQuery, setSearchQuery] = useState('');

    const categories = [
        { id: 'all', label: 'All Categories', icon: Grid, count: 234 },
        { id: 'textbooks', label: 'Textbooks', icon: BookOpen, count: 89 },
        { id: 'sublease', label: 'Sub-leasing', icon: Home, count: 45 },
        { id: 'marketplace', label: 'Marketplace', icon: Package, count: 78 },
        { id: 'services', label: 'Services', icon: Briefcase, count: 22 }
    ];

    const listings = [
        {
            id: 1,
            title: 'Calculus: Early Transcendentals 9th Edition',
            price: 85,
            originalPrice: 250,
            category: 'textbooks',
            seller: 'Sarah Chen',
            sellerRating: 4.9,
            location: 'North Campus',
            timePosted: '2h ago',
            image: '📚',
            condition: 'Like New',
            verified: true,
            saves: 12
        },
        {
            id: 2,
            title: '2BR/2BA Spring Sublease - University Terrace',
            price: 650,
            priceType: '/month',
            category: 'sublease',
            seller: 'Marcus Johnson',
            sellerRating: 5.0,
            location: 'University Terrace',
            timePosted: '5h ago',
            image: '🏠',
            details: 'Available Jan-May',
            verified: true,
            saves: 28
        },
        {
            id: 3,
            title: 'MacBook Pro 2020 M1 - Perfect Condition',
            price: 850,
            originalPrice: 1299,
            category: 'marketplace',
            seller: 'Emily Rodriguez',
            sellerRating: 4.8,
            location: 'Student Union',
            timePosted: '1d ago',
            image: '💻',
            condition: 'Excellent',
            verified: true,
            saves: 45
        },
        {
            id: 4,
            title: 'Math Tutoring - Calculus & Statistics',
            price: 25,
            priceType: '/hour',
            category: 'services',
            seller: 'David Park',
            sellerRating: 5.0,
            location: 'Atkins Library',
            timePosted: '3h ago',
            image: '👨‍🏫',
            details: '4 years experience',
            verified: true,
            saves: 19
        },
        {
            id: 5,
            title: 'Chemistry Lab Manual & Goggles Bundle',
            price: 40,
            originalPrice: 95,
            category: 'textbooks',
            seller: 'Jessica Lee',
            sellerRating: 4.7,
            location: 'South Campus',
            timePosted: '6h ago',
            image: '🧪',
            condition: 'Good',
            verified: true,
            saves: 8
        },
        {
            id: 6,
            title: 'Mini Fridge - Excellent for Dorms',
            price: 60,
            category: 'marketplace',
            seller: 'Alex Kim',
            sellerRating: 4.9,
            location: 'Kennedy Hall',
            timePosted: '12h ago',
            image: '❄️',
            condition: 'Very Good',
            verified: true,
            saves: 15
        },
        {
            id: 7,
            title: '1BR Available in 4BR Apartment',
            price: 525,
            priceType: '/month',
            category: 'sublease',
            seller: 'Taylor Brown',
            sellerRating: 4.8,
            location: 'Greek Village',
            timePosted: '8h ago',
            image: '🛏️',
            details: 'Utilities included',
            verified: true,
            saves: 22
        },
        {
            id: 8,
            title: 'Professional Resume Writing Service',
            price: 35,
            priceType: '/resume',
            category: 'services',
            seller: 'Jordan Lee',
            sellerRating: 5.0,
            location: 'Online',
            timePosted: '1d ago',
            image: '📝',
            details: '24hr turnaround',
            verified: true,
            saves: 31
        },
        {
            id: 9,
            title: 'Physics Textbook + Solutions Manual',
            price: 95,
            originalPrice: 280,
            category: 'textbooks',
            seller: 'Chris Martinez',
            sellerRating: 4.9,
            location: 'Engineering Campus',
            timePosted: '4h ago',
            image: '⚛️',
            condition: 'Like New',
            verified: true,
            saves: 17
        }
    ];

    const filteredListings = listings.filter(listing =>
        (selectedCategory === 'all' || listing.category === selectedCategory) &&
        (searchQuery === '' || listing.title.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-emerald-800 rounded-xl flex items-center justify-center">
                                <Crown className="w-6 h-6 text-amber-400" />
                            </div>
                            <h1 className="text-xl sm:text-2xl font-bold">Niner Exchange</h1>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="hidden sm:block px-4 py-2 text-sm font-medium hover:bg-emerald-700 rounded-lg transition-colors">
                                My Listings
                            </button>
                            <button className="bg-amber-400 text-emerald-900 px-4 sm:px-6 py-2 rounded-lg font-bold hover:bg-amber-500 transition-all text-sm sm:text-base">
                                + Post
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Search Section */}
            <div className="bg-white border-b border-gray-200 sticky top-16 z-40 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
                    <div className="flex flex-col sm:flex-row gap-3">
                        {/* Search Bar */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search listings..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                            />
                        </div>

                        {/* Filter & View Options */}
                        <div className="flex gap-2">
                            <button className="flex items-center gap-2 px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors">
                                <SlidersHorizontal className="w-5 h-5 text-gray-600" />
                                <span className="hidden sm:inline text-sm font-medium text-gray-700">Filters</span>
                            </button>
                            <div className="flex bg-gray-50 rounded-xl border border-gray-200 p-1">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-100'}`}
                                >
                                    <Grid className="w-5 h-5 text-gray-600" />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-100'}`}
                                >
                                    <List className="w-5 h-5 text-gray-600" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Sidebar - Categories */}
                    <aside className="lg:w-64 flex-shrink-0">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sticky top-32">
                            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Filter className="w-5 h-5" />
                                Categories
                            </h2>
                            <div className="space-y-1">
                                {categories.map((category) => {
                                    const Icon = category.icon;
                                    return (
                                        <button
                                            key={category.id}
                                            onClick={() => setSelectedCategory(category.id)}
                                            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                                                selectedCategory === category.id
                                                    ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg'
                                                    : 'hover:bg-gray-50 text-gray-700'
                                            }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <Icon className="w-5 h-5" />
                                                <span className="font-medium text-sm">{category.label}</span>
                                            </div>
                                            <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                                                selectedCategory === category.id
                                                    ? 'bg-white bg-opacity-20'
                                                    : 'bg-gray-100 text-gray-600'
                                            }`}>
                        {category.count}
                      </span>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Quick Stats */}
                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-sm">
                                        <TrendingUp className="w-4 h-4 text-emerald-600" />
                                        <span className="text-gray-600">89 new today</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <User className="w-4 h-4 text-emerald-600" />
                                        <span className="text-gray-600">2.3k active users</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content - Listings */}
                    <main className="flex-1">
                        {/* Results Header */}
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">
                                    {selectedCategory === 'all' ? 'All Listings' : categories.find(c => c.id === selectedCategory)?.label}
                                </h2>
                                <p className="text-sm text-gray-600 mt-1">{filteredListings.length} results found</p>
                            </div>
                        </div>

                        {/* Listings Grid */}
                        <div className={viewMode === 'grid'
                            ? "grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
                            : "space-y-4"
                        }>
                            {filteredListings.map((listing) => (
                                <div
                                    key={listing.id}
                                    className={`bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-xl transition-all cursor-pointer group overflow-hidden ${
                                        viewMode === 'list' ? 'flex' : ''
                                    }`}
                                >
                                    {/* Image Section */}
                                    <div className={`bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative ${
                                        viewMode === 'list' ? 'w-48 h-48' : 'h-56'
                                    }`}>
                                        <div className="text-6xl group-hover:scale-110 transition-transform">
                                            {listing.image}
                                        </div>

                                        {/* Overlay Actions */}
                                        <div className="absolute top-3 right-3 flex gap-2">
                                            <button className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors">
                                                <Heart className="w-4 h-4 text-gray-700" />
                                            </button>
                                            <button className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors">
                                                <Share2 className="w-4 h-4 text-gray-700" />
                                            </button>
                                        </div>

                                        {/* Category Badge */}
                                        <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 bg-white bg-opacity-90 backdrop-blur-sm rounded-full text-xs font-semibold text-emerald-700">
                        {categories.find(c => c.id === listing.category)?.label}
                      </span>
                                        </div>

                                        {/* Verified Badge */}
                                        {listing.verified && (
                                            <div className="absolute bottom-3 left-3">
                        <span className="px-3 py-1 bg-emerald-600 text-white rounded-full text-xs font-bold flex items-center gap-1">
                          ✓ Verified
                        </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Content Section */}
                                    <div className="p-5 flex-1">
                                        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                                            {listing.title}
                                        </h3>

                                        {/* Price */}
                                        <div className="mb-3">
                                            <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-emerald-600">
                          ${listing.price}
                        </span>
                                                {listing.priceType && (
                                                    <span className="text-sm text-gray-500">{listing.priceType}</span>
                                                )}
                                            </div>
                                            {listing.originalPrice && (
                                                <span className="text-sm text-gray-400 line-through">
                          ${listing.originalPrice}
                        </span>
                                            )}
                                        </div>

                                        {/* Seller Info */}
                                        <div className="flex items-center gap-2 mb-3 text-sm">
                                            <div className="w-8 h-8 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-full flex items-center justify-center text-white font-bold text-xs">
                                                {listing.seller.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">{listing.seller}</p>
                                                <div className="flex items-center gap-1">
                                                    <span className="text-amber-500">★</span>
                                                    <span className="text-gray-600 text-xs">{listing.sellerRating}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Meta Info */}
                                        <div className="space-y-2 text-sm text-gray-600">
                                            <div className="flex items-center gap-2">
                                                <MapPin className="w-4 h-4" />
                                                <span>{listing.location}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-4 h-4" />
                                                <span>{listing.timePosted}</span>
                                            </div>
                                            {(listing.condition || listing.details) && (
                                                <div className="flex items-center gap-2">
                                                    <DollarSign className="w-4 h-4" />
                                                    <span>{listing.condition || listing.details}</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Footer */}
                                        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                          {listing.saves} saves
                      </span>
                                            <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors text-sm">
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Load More */}
                        <div className="mt-8 text-center">
                            <button className="px-8 py-3 bg-white border-2 border-gray-200 rounded-xl font-semibold text-gray-700 hover:border-emerald-600 hover:text-emerald-600 transition-all">
                                Load More Listings
                            </button>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}