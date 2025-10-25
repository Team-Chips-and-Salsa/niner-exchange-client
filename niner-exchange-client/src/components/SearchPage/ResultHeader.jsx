import React from 'react';

export default function ResultHeader({
    selectedCategory,
    categories,
    filteredListings,
}) {
    return (
        <div className="flex items-center justify-between mb-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-900">
                    {selectedCategory === 'all'
                        ? 'All Listings'
                        : categories.find((c) => c.id === selectedCategory)
                              ?.label}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                    {filteredListings.length} results found
                </p>
            </div>
        </div>
    );
}
