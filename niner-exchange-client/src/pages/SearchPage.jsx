import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useMemo, useEffect } from 'react';
import { BookOpen, Home, Package, Briefcase } from 'lucide-react';
import SearchSection from '../components/SearchPage/SearchSection.jsx';
import ListingsGrid from '../components/SearchPage/ListingsGrid.jsx';
import ResultHeader from '../components/SearchPage/ResultHeader.jsx';
import FilterSidebar from '../components/SearchPage/filterSidebar/FilterSidebar.jsx';
import { fetchListings } from '../services/listingApi.js';

export default function NinerListingsBrowser() {
    const { search } = useLocation();
    const navigate = useNavigate();
    const queryParams = useMemo(() => new URLSearchParams(search), [search]);
    const searchQuery = queryParams.get('search') || '';
    const listingType = queryParams.get('listing_type') || '';
    // Default filters for both draft and committed state
    const defaultFilters = {
        priceRange: [0, 2000],
        // renamed from 'condition' to 'conditions' to match components
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
    };

    const [viewMode, setViewMode] = useState('grid');
    const [listings, setListings] = useState([]);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // Committed filters drive fetching
    const [filters, setFilters] = useState(defaultFilters);
    // Draft filters are edited in the sidebar; only applied on Apply
    const [draftFilters, setDraftFilters] = useState(defaultFilters);

    const listingTypes = [
        { id: 'ALL', title: 'All', icon: Package },
        { id: 'TEXTBOOK', title: 'Textbooks', icon: BookOpen },
        { id: 'SUBLEASE', title: 'Housing', icon: Home },
        { id: 'ITEM', title: 'Marketplace', icon: Package },
        { id: 'SERVICE', title: 'Services', icon: Briefcase },
    ];

    // Initialize filters from URL on load/URL change
    useEffect(() => {
        const min = queryParams.get('min_price');
        const max = queryParams.get('max_price');
        const status = queryParams.get('status');
        const conditionParam = queryParams.get('condition');
        const listingTypesParam = queryParams.get('listing_types');
        const propertyTypesParam = queryParams.get('property_types');
        const bedroomsMin = queryParams.get('bedrooms_min');
        const roommatesMax = queryParams.get('roommates_max');
        const distanceMax = queryParams.get('distance_minutes_max');
        const startDate = queryParams.get('start_date');
        const endDate = queryParams.get('end_date');
        const courseCode = queryParams.get('course_code');
        const keywords = queryParams.get('keywords');
        const priceNewMin = queryParams.get('price_new_min');
        const priceNewMax = queryParams.get('price_new_max');

        const parseCsv = (val) =>
            val
                ? String(val)
                      .split(',')
                      .map((s) => s.trim())
                      .filter(Boolean)
                : undefined;

        const next = (prev) => ({
            ...prev,
            priceRange:
                min || max
                    ? [
                          Number(min ?? prev.priceRange?.[0] ?? 0),
                          Number(max ?? prev.priceRange?.[1] ?? 2000),
                      ]
                    : prev.priceRange,
            activeOnly: status
                ? String(status).toUpperCase() === 'ACTIVE'
                : false,
            // parse comma-separated arrays if provided
            conditions: parseCsv(conditionParam) ?? prev.conditions,
            listingTypes: parseCsv(listingTypesParam) ?? prev.listingTypes,
            propertyTypes: parseCsv(propertyTypesParam) ?? prev.propertyTypes,
            bedrooms: bedroomsMin ? Number(bedroomsMin) : prev.bedrooms,
            roommates: roommatesMax ? Number(roommatesMax) : prev.roommates,
            distanceMinutes: distanceMax
                ? Number(distanceMax)
                : prev.distanceMinutes,
            startDate: startDate ?? prev.startDate,
            endDate: endDate ?? prev.endDate,
            courseCode: courseCode ?? prev.courseCode,
            keywords: keywords ?? prev.keywords,
            priceNewRange:
                priceNewMin || priceNewMax
                    ? [
                          Number(priceNewMin ?? prev.priceNewRange?.[0] ?? 0),
                          Number(
                              priceNewMax ?? prev.priceNewRange?.[1] ?? 1500,
                          ),
                      ]
                    : prev.priceNewRange,
        });

        setFilters((prev) => next(prev));
        setDraftFilters((prev) => next(prev));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    // Fetch when committed filters or URL search/listing type change
    useEffect(() => {
        const loadListings = async () => {
            const params = {
                search: searchQuery,
                listing_type: listingType,
                min_price: filters.priceRange?.[0],
                max_price: filters.priceRange?.[1],
                status: filters.activeOnly ? 'ACTIVE' : undefined,
                // arrays as comma-separated strings
                condition:
                    filters.conditions && filters.conditions.length
                        ? filters.conditions.join(',')
                        : undefined,
                listing_types:
                    filters.listingTypes && filters.listingTypes.length
                        ? filters.listingTypes.join(',')
                        : undefined,
                property_types:
                    filters.propertyTypes && filters.propertyTypes.length
                        ? filters.propertyTypes.join(',')
                        : undefined,
                bedrooms_min: filters.bedrooms || undefined,
                roommates_max: filters.roommates || undefined,
                distance_minutes_max: filters.distanceMinutes || undefined,
                start_date: filters.startDate || undefined,
                end_date: filters.endDate || undefined,
                course_code: filters.courseCode || undefined,
                keywords: filters.keywords || undefined,
                price_new_min: filters.priceNewRange?.[0],
                price_new_max: filters.priceNewRange?.[1],
            };
            const data = await fetchListings(params);
            setListings(data);
        };
        loadListings();
    }, [search, searchQuery, listingType, filters]);

    // Update draft while editing in sidebar
    const handleFilterChange = (key, value) => {
        setDraftFilters((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    // Commit draft -> filters, sync URL, close sidebar
    const handleApplyFilters = () => {
        setFilters(draftFilters);

        const params = new URLSearchParams(search);
        const setOrDelete = (name, value) => {
            const empty =
                value === '' ||
                value === null ||
                value === undefined ||
                (Array.isArray(value) && value.length === 0);
            if (empty) params.delete(name);
            else params.set(name, String(value));
        };

        setOrDelete('min_price', draftFilters.priceRange?.[0]);
        setOrDelete('max_price', draftFilters.priceRange?.[1]);
        // join array conditions to a single param
        setOrDelete(
            'condition',
            draftFilters.conditions && draftFilters.conditions.length
                ? draftFilters.conditions.join(',')
                : undefined,
        );
        setOrDelete(
            'listing_types',
            draftFilters.listingTypes && draftFilters.listingTypes.length
                ? draftFilters.listingTypes.join(',')
                : undefined,
        );
        setOrDelete(
            'property_types',
            draftFilters.propertyTypes && draftFilters.propertyTypes.length
                ? draftFilters.propertyTypes.join(',')
                : undefined,
        );
        setOrDelete('bedrooms_min', draftFilters.bedrooms);
        setOrDelete('roommates_max', draftFilters.roommates);
        setOrDelete('distance_minutes_max', draftFilters.distanceMinutes);
        setOrDelete('start_date', draftFilters.startDate);
        setOrDelete('end_date', draftFilters.endDate);
        setOrDelete('course_code', draftFilters.courseCode);
        setOrDelete('keywords', draftFilters.keywords);
        setOrDelete('price_new_min', draftFilters.priceNewRange?.[0]);
        setOrDelete('price_new_max', draftFilters.priceNewRange?.[1]);

        if (draftFilters.activeOnly) params.set('status', 'ACTIVE');
        else params.delete('status');

        navigate(`?${params.toString()}`);
        setIsFilterOpen(false);
    };

    const handleClearFilters = () => {
        setFilters(defaultFilters);
        setDraftFilters(defaultFilters);

        const params = new URLSearchParams(search);
        [
            'min_price',
            'max_price',
            'status',
            'condition',
            'listing_types',
            'property_types',
            'bedrooms_min',
            'roommates_max',
            'distance_minutes_max',
            'start_date',
            'end_date',
            'course_code',
            'keywords',
            'price_new_min',
            'price_new_max',
        ].forEach((k) => params.delete(k));
        navigate(`?${params.toString()}`);
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

    // When opening the sidebar, start from committed filters
    useEffect(() => {
        if (isFilterOpen) setDraftFilters(filters);
    }, [isFilterOpen, filters]);

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
                        filters={draftFilters}
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
