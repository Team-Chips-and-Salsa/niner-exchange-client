import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useMemo, useEffect } from 'react';
import { BookOpen, Home, Package, Briefcase } from 'lucide-react';
import SearchSection from '../components/SearchPage/SearchSection.jsx';
import ListingsGrid from '../components/SearchPage/ListingsGrid.jsx';
import ResultHeader from '../components/SearchPage/ResultHeader.jsx';
import FilterSidebar from '../components/filterSidebar/FilterSidebar.jsx';
import { fetchListings } from '../services/listingApi.js';

export default function NinerListingsBrowser() {
    const { search } = useLocation();
    const navigate = useNavigate();
    const queryParams = useMemo(() => new URLSearchParams(search), [search]);
    const searchQuery = queryParams.get('search') || '';
    const listingType = queryParams.get('listing_type') || '';
    const [viewMode, setViewMode] = useState('grid');
    const [listings, setListings] = useState([]);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filters, setFilters] = useState({
        priceRange: [0, 2000],
        conditions: [],
        listingTypes: [],
        propertyTypes: [],
        bedrooms: 3,
        roommates: 3,
        distanceMinutes: 15,
        startDate: '',
        endDate: '',
        courseCode: '',
        keywords: '',
        priceNewRange: [0, 1500],
        activeOnly: false,
    });

    const listingTypes = [
        { id: 'ALL', title: 'All', icon: Package },
        { id: 'TEXTBOOK', title: 'Textbooks', icon: BookOpen },
        { id: 'SUBLEASE', title: 'Housing', icon: Home },
        { id: 'ITEM', title: 'Marketplace', icon: Package },
        { id: 'SERVICE', title: 'Services', icon: Briefcase },
    ];

    useEffect(() => {
        const loadListings = async () => {
            const params = {
                search: searchQuery,
                listing_type: listingType,
                min_price: filters.priceRange?.[0],
                max_price: filters.priceRange?.[1],
                // Add more filter params as needed based on your backend API
            };
            const data = await fetchListings(params);
            setListings(data);
        };
        loadListings();
    }, [search, searchQuery, listingType, filters]);

    const handleFilterChange = (key, value) => {
        setFilters((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleApplyFilters = () => {
        // Filters are already applied via useEffect dependency
        setIsFilterOpen(false);
    };

    const handleClearFilters = () => {
        setFilters({
            priceRange: [0, 2000],
            conditions: [],
            listingTypes: [],
            propertyTypes: [],
            bedrooms: 3,
            roommates: 3,
            distanceMinutes: 15,
            startDate: '',
            endDate: '',
            courseCode: '',
            keywords: '',
            priceNewRange: [0, 1500],
            activeOnly: false,
        });
    };

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
        if (newListingType && newListingType.toUpperCase() !== 'ALL') {
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
                onFilterClick={() => setIsFilterOpen(true)}
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Filter Sidebar */}
                    <FilterSidebar
                        listingType={listingType}
                        isOpen={isFilterOpen}
                        onClose={() => setIsFilterOpen(false)}
                        filters={filters}
                        onFilterChange={handleFilterChange}
                        onApplyFilters={handleApplyFilters}
                        onClearFilters={handleClearFilters}
                    />

                    {/* Main Content - Listings */}
                    <main className="flex-1">
                        <ResultHeader
                            selectedListingType={listingType}
                            listingTypes={listingTypes}
                            listings={listings}
                        />
                        <ListingsGrid
                            listings={listings}
                            viewMode={viewMode}
                            setViewMode={setViewMode}
                            listingTypes={listingTypes}
                        />
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
