import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export default function ResultHeader({
    selectedListingType,
    listingTypes,
    listings,
}) {
    const { search } = useLocation();

    const queryParams = useMemo(() => {
        return new URLSearchParams(search);
    }, [search]);

    const activeListingType = queryParams.get('listing_type') || '';

    console.log(activeListingType, listingTypes, selectedListingType);
    return (
        <div className="flex items-center justify-between mb-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-900">
                    {activeListingType === ''
                        ? 'All Listings'
                        : listingTypes.find((c) => c.id === activeListingType)
                              ?.title}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                    {listings.length} results found
                </p>
            </div>
        </div>
    );
}
