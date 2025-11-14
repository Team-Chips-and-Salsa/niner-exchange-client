import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export default function ItemFilters({ filters, onFilterChange }) {
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
                    max={1000}
                    step={25}
                    value={filters.priceRange || [0, 1000]}
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
                            ${filters.priceRange?.[1] || 1000}
                        </span>
                    </div>
                </div>
            </div>

            {/* Condition */}
            <div className="pb-6 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">Condition</h3>
                <div className="space-y-2">
                    {[
                        { value: 'NEW', label: 'New' },
                        { value: 'LIKE_NEW', label: 'Like New' },
                        { value: 'USED', label: 'Used' },
                    ].map((condition) => (
                        <label
                            key={condition.value}
                            className="flex items-center gap-3 cursor-pointer group"
                        >
                            <input
                                type="checkbox"
                                checked={
                                    filters.conditions?.includes(
                                        condition.value,
                                    ) || false
                                }
                                onChange={(e) => {
                                    const current = filters.conditions || [];
                                    const updated = e.target.checked
                                        ? [...current, condition.value]
                                        : current.filter(
                                              (c) => c !== condition.value,
                                          );
                                    onFilterChange('conditions', updated);
                                }}
                                className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                            />
                            <span className="text-gray-700 group-hover:text-emerald-600 transition-colors">
                                {condition.label}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Original Price Range */}
            <div className="pb-6 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">
                    Original Price (New)
                </h3>
                <Slider
                    range
                    min={0}
                    max={1500}
                    step={50}
                    value={filters.priceNewRange || [0, 1500]}
                    onChange={(value) => onFilterChange('priceNewRange', value)}
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
                            ${filters.priceNewRange?.[0] || 0}
                        </span>
                    </div>
                    <div className="text-sm">
                        <span className="text-gray-500">Max: </span>
                        <span className="font-semibold text-gray-900">
                            ${filters.priceNewRange?.[1] || 1500}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
