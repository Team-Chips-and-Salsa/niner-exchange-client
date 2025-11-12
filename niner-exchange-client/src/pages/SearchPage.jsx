import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useMemo, useEffect } from 'react';
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
import { fetchListings } from '../services/listingApi.js';

export default function NinerListingsBrowser() {
    const { search } = useLocation();
    const navigate = useNavigate();
    const queryParams = useMemo(() => new URLSearchParams(search), [search]);
    const searchQuery = queryParams.get('search') || '';
    const listingType = queryParams.get('listing_type') || '';
    const [viewMode, setViewMode] = useState('grid');
    const [selectedListingType, setSelectedListingType] = useState(listingType);
    const [listings, setListings] = useState([]);

    const listingTypes = [
        { id: 'ALL', title: 'All', icon: Package },
        { id: 'TEXTBOOK', title: 'Textbooks', icon: BookOpen },
        { id: 'SUBLEASE', title: 'Housing', icon: Home },
        { id: 'ITEM', title: 'Marketplace', icon: Package },
        { id: 'SERVICE', title: 'Services', icon: Briefcase },
    ];

    useEffect(() => {
        const loadListings = async () => {
            // Build the params object from your state/URL
            const params = {
                search: searchQuery,
                listing_type: listingType,
                // min_price: minPrice,
                // max_price: maxPrice,
            };

            // Pass the params object to your API function
            const data = await fetchListings(params);
            setListings(data);
        };

        loadListings();
    }, [search, searchQuery, listingType]);

    const handleSearchSubmit = (newSearchTerm) => {
        const params = new URLSearchParams(search);
        if (newSearchTerm) {
            params.set('search', newSearchTerm);
        } else {
            params.delete('search');
        }
        navigate(`?${params.toString()}`);
    };

    const handleCategoryChange = (newListingType) => {
        const params = new URLSearchParams(search);
        if (newListingType && newListingType !== 'all') {
            params.set('listing_type', newListingType);
        } else {
            params.delete('listing_type');
        }
        navigate(`?${params.toString()}`);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <SearchSection
                searchQuery={searchQuery}
                selectedListingType={listingType}
                onListingTypeChange={handleCategoryChange}
                onSearchSubmit={handleSearchSubmit}
                viewMode={viewMode}
                setViewMode={setViewMode}
                listingTypes={listingTypes}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Main Content - Listings */}
                    <main className="flex-1">
                        <ResultHeader
                            selectedListingType={selectedListingType}
                            listingTypes={listingTypes}
                            listings={listings}
                        />
                        <ListingsGrid
                            listings={listings}
                            viewMode={viewMode}
                            setViewMode={setViewMode}
                            listingTypes={listingTypes}
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
