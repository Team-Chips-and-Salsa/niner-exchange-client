import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export default function AllListingsFilters({ filters, onFilterChange }) {
    return (
        <div className="space-y-6">
            {/* Price Range */}
            <div className="pb-6 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">
                    Price Range
                </h3>
                <Slider
                    range
                    min={0}
                    max={2000}
                    step={25}
                    value={filters.priceRange || [0, 2000]}
                    onChange={(value) => onFilterChange('priceRange', value)}
                    trackStyle={[{ backgroundColor: '#059669' }]}
                    handleStyle={[
                        { borderColor: '#059669', backgroundColor: '#fff' },
                        { borderColor: '#059669', backgroundColor: '#fff' },
                    ]}
                    railStyle={{ backgroundColor: '#e5e7eb' }}
                />
                <div className="flex justify-between mt-3">
                    <div className="text-sm">
                        <span className="text-gray-500">Min: </span>
                        <span className="font-semibold text-gray-900">
                            ${filters.priceRange?.[0] || 0}
                        </span>
                    </div>
                    <div className="text-sm">
                        <span className="text-gray-500">Max: </span>
                        <span className="font-semibold text-gray-900">
                            ${filters.priceRange?.[1] || 2000}
                        </span>
                    </div>
                </div>
            </div>

            {/* Listing Type */}
            <div className="pb-6 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">
                    Listing Type
                </h3>
                <div className="space-y-2">
                    {[
                        { value: 'ITEM', label: 'Item' },
                        { value: 'TEXTBOOK', label: 'Textbook' },
                        { value: 'SUBLEASE', label: 'Sublease' },
                        { value: 'SERVICE', label: 'Service' },
                    ].map((type) => (
                        <label
                            key={type.value}
                            className="flex items-center gap-3 cursor-pointer group"
                        >
                            <input
                                type="checkbox"
                                checked={
                                    filters.listingTypes?.includes(
                                        type.value,
                                    ) || false
                                }
                                onChange={(e) => {
                                    const current = filters.listingTypes || [];
                                    const updated = e.target.checked
                                        ? [...current, type.value]
                                        : current.filter(
                                              (t) => t !== type.value,
                                          );
                                    onFilterChange('listingTypes', updated);
                                }}
                                className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                            />
                            <span className="text-gray-700 group-hover:text-emerald-600 transition-colors">
                                {type.label}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Status */}
            <div className="pb-6 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">Status</h3>
                <div className="space-y-2">
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <input
                            type="checkbox"
                            checked={filters.activeOnly || false}
                            onChange={(e) =>
                                onFilterChange('activeOnly', e.target.checked)
                            }
                            className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                        />
                        <span className="text-gray-700 group-hover:text-emerald-600 transition-colors">
                            Active listings only
                        </span>
                    </label>
                </div>
            </div>
        </div>
    );
}
