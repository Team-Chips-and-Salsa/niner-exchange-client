/*
    Used AI to help with the filtering logic and create the filters sidebar according to our figma design
*/
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useMemo, useEffect } from 'react';
import { BookOpen, Home, Package, Briefcase } from 'lucide-react';
import SearchSection from '../components/SearchPage/SearchSection.jsx';
import ListingsGrid from '../components/SearchPage/ListingsGrid.jsx';
import ResultHeader from '../components/SearchPage/ResultHeader.jsx';
import FilterSidebar from '../components/SearchPage/filterSidebar/FilterSidebar.jsx';
import { fetchListings } from '../services/listingApi.js';
import NoListingsCard from '../components/userProfile/NoListingsCard.jsx';

export default function NinerListingsBrowser() {
    const { search } = useLocation();
    const navigate = useNavigate();
    const queryParams = useMemo(() => new URLSearchParams(search), [search]);
    const searchQuery = queryParams.get('search') || '';
    const listingType = queryParams.get('listing_type') || '';
    const defaultFilters = {
        priceRange: [0, 2000],
        conditions: [],
        listingTypes: [],
        propertyTypes: [],
        bedrooms: undefined,
        roommates: undefined,
        distanceMinutes: undefined,
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

    const [filters, setFilters] = useState(defaultFilters);
    const [draftFilters, setDraftFilters] = useState(defaultFilters);

    const listingTypes = [
        { id: 'ALL', title: 'All', icon: Package },
        { id: 'TEXTBOOK', title: 'Textbooks', icon: BookOpen },
        { id: 'SUBLEASE', title: 'Housing', icon: Home },
        { id: 'ITEM', title: 'Marketplace', icon: Package },
        { id: 'SERVICE', title: 'Services', icon: Briefcase },
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 12;

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
            conditions: parseCsv(conditionParam) ?? prev.conditions,
            listingTypes: parseCsv(listingTypesParam) ?? prev.listingTypes,
            propertyTypes: parseCsv(propertyTypesParam) ?? prev.propertyTypes,
            bedrooms: bedroomsMin ? Number(bedroomsMin) : undefined,
            roommates: roommatesMax ? Number(roommatesMax) : undefined,
            distanceMinutes: distanceMax ? Number(distanceMax) : undefined,
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
        setCurrentPage(1); // Reset page on filter change
    }, [search]);

    useEffect(() => {
        const loadListings = async () => {
            const params = {
                search: searchQuery,
                listing_type: listingType,
                min_price: filters.priceRange?.[0],
                max_price: filters.priceRange?.[1],
                status: filters.activeOnly ? 'ACTIVE' : undefined,
            };

            const currentType = listingType?.toUpperCase();

            // Conditionally add filters based on type
            if (!currentType || currentType === 'ALL') {
                params.listing_types =
                    filters.listingTypes && filters.listingTypes.length
                        ? filters.listingTypes.join(',')
                        : undefined;
            }

            if (currentType === 'TEXTBOOK') {
                params.course_code = filters.courseCode || undefined;
                params.condition =
                    filters.conditions && filters.conditions.length
                        ? filters.conditions.join(',')
                        : undefined;
                params.price_new_min = filters.priceNewRange?.[0];
                params.price_new_max = filters.priceNewRange?.[1];
            }

            if (currentType === 'ITEM') {
                params.condition =
                    filters.conditions && filters.conditions.length
                        ? filters.conditions.join(',')
                        : undefined;
                params.price_new_min = filters.priceNewRange?.[0];
                params.price_new_max = filters.priceNewRange?.[1];
            }

            if (currentType === 'SUBLEASE') {
                params.property_types =
                    filters.propertyTypes && filters.propertyTypes.length
                        ? filters.propertyTypes.join(',')
                        : undefined;
                params.bedrooms_min = filters.bedrooms || undefined;
                params.roommates_max = filters.roommates || undefined;
                params.distance_minutes_max =
                    filters.distanceMinutes || undefined;
                params.start_date = filters.startDate || undefined;
                params.end_date = filters.endDate || undefined;
            }

            if (currentType === 'SERVICE') {
                params.keywords = filters.keywords || undefined;
            }

            const data = await fetchListings(params);
            setListings(data);
        };
        loadListings();
    }, [search, searchQuery, listingType, filters]);

    const handleFilterChange = (key, value) => {
        setDraftFilters((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleApplyFilters = () => {
        setFilters(draftFilters);

        const params = new URLSearchParams(search);

        const setOrDelete = (name, value) => {
            const empty =
                value === '' ||
                value === null ||
                value === undefined ||
                (Array.isArray(value) && value.length === 0);
            if (empty) {
                params.delete(name);
            } else {
                params.set(name, String(value));
            }
        };

        const currentType = listingType?.toUpperCase();

        setOrDelete('min_price', draftFilters.priceRange?.[0]);
        setOrDelete('max_price', draftFilters.priceRange?.[1]);
        setOrDelete('status', draftFilters.activeOnly ? 'ACTIVE' : undefined);

        if (!currentType || currentType === 'ALL') {
            setOrDelete('listing_types', draftFilters.listingTypes.join(','));
        }

        if (currentType === 'TEXTBOOK') {
            setOrDelete('condition', draftFilters.conditions.join(','));
            setOrDelete('course_code', draftFilters.courseCode);
            setOrDelete('price_new_min', draftFilters.priceNewRange?.[0]);
            setOrDelete('price_new_max', draftFilters.priceNewRange?.[1]);
        }

        if (currentType === 'ITEM') {
            setOrDelete('condition', draftFilters.conditions.join(','));
            setOrDelete('price_new_min', draftFilters.priceNewRange?.[0]);
            setOrDelete('price_new_max', draftFilters.priceNewRange?.[1]);
        }

        if (currentType === 'SUBLEASE') {
            setOrDelete('property_types', draftFilters.propertyTypes.join(','));
            setOrDelete('bedrooms_min', draftFilters.bedrooms);
            setOrDelete('roommates_max', draftFilters.roommates);
            setOrDelete('distance_minutes_max', draftFilters.distanceMinutes);
            setOrDelete('start_date', draftFilters.startDate);
            setOrDelete('end_date', draftFilters.endDate);
        }

        if (currentType === 'SERVICE') {
            setOrDelete('keywords', draftFilters.keywords);
        }

        if (currentType !== 'TEXTBOOK' && currentType !== 'ITEM') {
            params.delete('condition');
        }
        if (currentType !== 'TEXTBOOK') {
            params.delete('course_code');
        }
        if (currentType !== 'TEXTBOOK' && currentType !== 'ITEM') {
            params.delete('price_new_min');
            params.delete('price_new_max');
        }
        if (currentType !== 'SUBLEASE') {
            params.delete('property_types');
            params.delete('bedrooms_min');
            params.delete('roommates_max');
            params.delete('distance_minutes_max');
            params.delete('start_date');
            params.delete('end_date');
        }
        if (currentType !== 'SERVICE') {
            params.delete('keywords');
        }
        if (currentType && currentType !== 'ALL') {
            params.delete('listing_types');
        }

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

        const newType = newListingType.toUpperCase();

        if (newListingType && newType !== 'ALL') {
            params.set('listing_type', newListingType);
        } else {
            params.delete('listing_type');
        }

        if (newType !== 'TEXTBOOK' && newType !== 'ITEM') {
            params.delete('condition');
        }
        if (newType !== 'TEXTBOOK') {
            params.delete('course_code');
        }
        if (newType !== 'TEXTBOOK' && newType !== 'ITEM') {
            params.delete('price_new_min');
            params.delete('price_new_max');
        }
        if (newType !== 'SUBLEASE') {
            params.delete('property_types');
            params.delete('bedrooms_min');
            params.delete('roommates_max');
            params.delete('distance_minutes_max');
            params.delete('start_date');
            params.delete('end_date');
        }
        if (newType !== 'SERVICE') {
            params.delete('keywords');
        }
        if (newType !== 'ALL') {
            params.delete('listing_types');
        }

        navigate(`?${params.toString()}`);
    };

    useEffect(() => {
        if (isFilterOpen) setDraftFilters(filters);
    }, [isFilterOpen, filters]);

    // Pagination Logic
    const totalPages = Math.ceil(listings.length / ITEMS_PER_PAGE);
    const currentListings = listings.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE,
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
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
                    <FilterSidebar
                        listingType={listingType}
                        isOpen={isFilterOpen}
                        onClose={() => setIsFilterOpen(false)}
                        filters={draftFilters}
                        onFilterChange={handleFilterChange}
                        onApplyFilters={handleApplyFilters}
                        onClearFilters={handleClearFilters}
                    />

                    <main className="flex-1">
                        <ResultHeader
                            selectedListingType={listingType}
                            listingTypes={listingTypes}
                            listings={listings}
                        />
                        {listings.length > 0 ? (
                            <ListingsGrid
                                listings={currentListings}
                                viewMode={viewMode}
                                setViewMode={setViewMode}
                                listingTypes={listingTypes}
                            />
                        ) : (
                            <NoListingsCard message="No listings found matching your criteria." />
                        )}

                        {/* Pagination Controls */}
                        {totalPages > 1 && (
                            <div className="mt-8 flex justify-center items-center gap-2">
                                <button
                                    onClick={() =>
                                        handlePageChange(currentPage - 1)
                                    }
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Previous
                                </button>

                                <div className="flex gap-1">
                                    {Array.from(
                                        { length: totalPages },
                                        (_, i) => i + 1,
                                    ).map((page) => (
                                        <button
                                            key={page}
                                            onClick={() =>
                                                handlePageChange(page)
                                            }
                                            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                                                currentPage === page
                                                    ? 'bg-emerald-600 text-white font-bold'
                                                    : 'hover:bg-gray-100 text-gray-700'
                                            }`}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    onClick={() =>
                                        handlePageChange(currentPage + 1)
                                    }
                                    disabled={currentPage === totalPages}
                                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}
