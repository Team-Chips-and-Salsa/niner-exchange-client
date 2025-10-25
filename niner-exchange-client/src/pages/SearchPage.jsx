import React, { useState } from 'react';
import {
    Search,
    BookOpen,
    Home,
    Package,
    Briefcase,
    Crown,
    SlidersHorizontal,
    MapPin,
    DollarSign,
    Clock,
    User,
    Heart,
    Share2,
    Filter,
    Grid,
    List,
    TrendingUp,
} from 'lucide-react';
import SearchSection from '../components/SearchPage/SearchSection.jsx';
import FilterSidebar from '../components/filterSidebar/FilterSidebar.jsx';
import ListingsGrid from '../components/SearchPage/ListingsGrid.jsx';
import ResultHeader from '../components/SearchPage/ResultHeader.jsx';

export default function NinerListingsBrowser() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [viewMode, setViewMode] = useState('grid');
    const [searchQuery, setSearchQuery] = useState('');

    const categories = [
        { id: 'all', label: 'All Categories', icon: Grid, count: 234 },
        { id: 'textbooks', label: 'Textbooks', icon: BookOpen, count: 89 },
        { id: 'sublease', label: 'Sub-leasing', icon: Home, count: 45 },
        { id: 'marketplace', label: 'Marketplace', icon: Package, count: 78 },
        { id: 'services', label: 'Services', icon: Briefcase, count: 22 },
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
            saves: 12,
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
            saves: 28,
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
            saves: 45,
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
            saves: 19,
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
            saves: 8,
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
            saves: 15,
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
            saves: 22,
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
            saves: 31,
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
            saves: 17,
        },
    ];

    const filteredListings = listings.filter(
        (listing) =>
            (selectedCategory === 'all' ||
                listing.category === selectedCategory) &&
            (searchQuery === '' ||
                listing.title
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())),
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <SearchSection
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                viewMode={viewMode}
                setViewMode={setViewMode}
                categories={categories}
                listings={listings}
                filteredListings={filteredListings}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Main Content - Listings */}
                    <main className="flex-1">
                        <ResultHeader
                            selectedCategory={selectedCategory}
                            categories={categories}
                            filteredListings={filteredListings}
                        />
                        <ListingsGrid
                            filteredListings={filteredListings}
                            viewMode={viewMode}
                            setViewMode={setViewMode}
                            categories={categories}
                        />
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
