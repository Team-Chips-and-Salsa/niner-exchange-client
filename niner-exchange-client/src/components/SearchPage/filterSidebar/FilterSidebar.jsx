import React from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import TextbookFilters from './TextbookFilter.jsx';
import SubleaseFilters from './ServicesFilter.jsx';
import ItemFilters from './MarketplaceFilter.jsx';
import ServiceFilters from './SubleasingFilter.jsx';
import AllListingsFilters from './AllFilter.jsx';

export default function FilterSidebar({
    listingType,
    isOpen,
    onClose,
    filters,
    onFilterChange,
    onApplyFilters,
    onClearFilters,
}) {
    const getFilterComponent = () => {
        switch (listingType?.toUpperCase()) {
            case 'TEXTBOOK':
                return (
                    <TextbookFilters
                        filters={filters}
                        onFilterChange={onFilterChange}
                    />
                );
            case 'SUBLEASE':
                return (
                    <SubleaseFilters
                        filters={filters}
                        onFilterChange={onFilterChange}
                    />
                );
            case 'ITEM':
                return (
                    <ItemFilters
                        filters={filters}
                        onFilterChange={onFilterChange}
                    />
                );
            case 'SERVICE':
                return (
                    <ServiceFilters
                        filters={filters}
                        onFilterChange={onFilterChange}
                    />
                );
            default:
                return (
                    <AllListingsFilters
                        filters={filters}
                        onFilterChange={onFilterChange}
                    />
                );
        }
    };

    return (
        <>
            {/* Mobile: render inline above results; Desktop: sticky sidebar */}
            <aside
                className={`
                    ${isOpen ? 'block' : 'hidden'} lg:block
                    lg:sticky lg:top-6
                    w-full lg:w-80 bg-white border border-gray-200 
                    rounded-2xl shadow-sm
                `}
            >
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between lg:rounded-t-2xl z-10">
                    <div className="flex items-center gap-2">
                        <SlidersHorizontal className="w-5 h-5 text-emerald-600" />
                        <h2 className="text-lg font-bold text-gray-900">
                            Filters
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-600" />
                    </button>
                </div>

                <div className="p-6">
                    {getFilterComponent()}

                    {/* Action Buttons */}
                    <div className="mt-6 space-y-3 bottom-0 bg-white pt-4">
                        <button
                            onClick={() => {
                                onApplyFilters();
                                onClose();
                            }}
                            className="w-full py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors shadow-sm"
                        >
                            Apply Filters
                        </button>
                        <button
                            onClick={onClearFilters}
                            className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                        >
                            Clear All
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}
