import Slider from 'rc-slider';
import React from 'react';
import 'rc-slider/assets/index.css';

export default function SubleaseFilters({ filters, onFilterChange }) {
    return (
        <div className="space-y-6">
            {/* Monthly Rent */}
            <div className="pb-6 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">
                    Monthly Rent
                </h3>
                <Slider
                    range
                    min={0}
                    max={2000}
                    step={50}
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

            {/* Property Type */}
            <div className="pb-6 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">
                    Property Type
                </h3>
                <div className="space-y-2">
                    {[
                        { value: 'APARTMENT', label: 'Apartment' },
                        { value: 'HOUSE', label: 'House' },
                    ].map((type) => (
                        <label
                            key={type.value}
                            className="flex items-center gap-3 cursor-pointer group"
                        >
                            <input
                                type="checkbox"
                                checked={
                                    filters.propertyTypes?.includes(
                                        type.value,
                                    ) || false
                                }
                                onChange={(e) => {
                                    const current = filters.propertyTypes || [];
                                    const updated = e.target.checked
                                        ? [...current, type.value]
                                        : current.filter(
                                              (t) => t !== type.value,
                                          );
                                    onFilterChange('propertyTypes', updated);
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

            {/* Number of Bedrooms */}
            <div className="pb-6 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">
                    Number of Bedrooms
                </h3>
                <Slider
                    min={1}
                    max={5}
                    step={1}
                    value={filters.bedrooms || 3}
                    onChange={(value) => onFilterChange('bedrooms', value)}
                    trackStyle={{ backgroundColor: '#059669' }}
                    handleStyle={{
                        borderColor: '#059669',
                        backgroundColor: '#fff',
                    }}
                    railStyle={{ backgroundColor: '#e5e7eb' }}
                    marks={{ 1: '1', 2: '2', 3: '3', 4: '4', 5: '5+' }}
                />
                <div className="mt-6 text-center">
                    <span className="text-sm text-gray-600">Minimum: </span>
                    <span className="text-sm font-semibold text-gray-900">
                        {filters.bedrooms || 3} bedroom(s)
                    </span>
                </div>
            </div>

            {/* Number of Roommates */}
            <div className="pb-6 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">
                    Number of Roommates
                </h3>
                <Slider
                    min={1}
                    max={6}
                    step={1}
                    value={filters.roommates || 3}
                    onChange={(value) => onFilterChange('roommates', value)}
                    trackStyle={{ backgroundColor: '#059669' }}
                    handleStyle={{
                        borderColor: '#059669',
                        backgroundColor: '#fff',
                    }}
                    railStyle={{ backgroundColor: '#e5e7eb' }}
                    marks={{ 1: '1', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6+' }}
                />
                <div className="mt-6 text-center">
                    <span className="text-sm text-gray-600">Maximum: </span>
                    <span className="text-sm font-semibold text-gray-900">
                        {filters.roommates || 3} roommate(s)
                    </span>
                </div>
            </div>

            {/* Distance from Campus */}
            <div className="pb-6 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">
                    Distance From Campus
                </h3>
                <Slider
                    min={1}
                    max={45}
                    step={5}
                    value={filters.distanceMinutes || 15}
                    onChange={(value) =>
                        onFilterChange('distanceMinutes', value)
                    }
                    trackStyle={{ backgroundColor: '#059669' }}
                    handleStyle={{
                        borderColor: '#059669',
                        backgroundColor: '#fff',
                    }}
                    railStyle={{ backgroundColor: '#e5e7eb' }}
                />
                <div className="mt-3 text-center">
                    <span className="text-sm font-semibold text-gray-900">
                        {filters.distanceMinutes || 15} minutes
                    </span>
                    <span className="text-sm text-gray-500"> maximum</span>
                </div>
            </div>

            {/* Lease Duration */}
            <div className="pb-6 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">
                    Lease Start Date
                </h3>
                <input
                    type="date"
                    value={filters.startDate || ''}
                    onChange={(e) =>
                        onFilterChange('startDate', e.target.value)
                    }
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                />
                <h3 className="font-semibold text-gray-900 mb-4 mt-4">
                    Lease End Date
                </h3>
                <input
                    type="date"
                    value={filters.endDate || ''}
                    onChange={(e) => onFilterChange('endDate', e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                />
            </div>
        </div>
    );
}
