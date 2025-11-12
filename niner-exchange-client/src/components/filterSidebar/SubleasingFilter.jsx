import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export default function ServiceFilters({ filters, onFilterChange }) {
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
                    max={500}
                    step={10}
                    value={filters.priceRange || [0, 500]}
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
                            ${filters.priceRange?.[1] || 500}
                        </span>
                    </div>
                </div>
            </div>

            {/* Description Search */}
            <div className="pb-6 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">
                    Service Keywords
                </h3>
                <input
                    type="text"
                    placeholder="e.g., tutoring, moving, photography"
                    value={filters.keywords || ''}
                    onChange={(e) => onFilterChange('keywords', e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                />
                <p className="text-xs text-gray-500 mt-2">
                    Search service descriptions
                </p>
            </div>
        </div>
    );
}
