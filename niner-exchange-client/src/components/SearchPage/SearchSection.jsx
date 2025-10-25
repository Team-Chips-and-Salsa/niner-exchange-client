import { Grid, List, Search, SlidersHorizontal } from 'lucide-react';
import React from 'react';

export default function SearchSection({
    searchQuery,
    setSearchQuery,
    viewMode,
    setViewMode,
    onSearchChange,
    onViewModeChange,
    onSearchSubmit,
}) {
    return (
        <div className="bg-white border-b border-gray-200 sticky top-16 z-40 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
                <div className="flex flex-col sm:flex-row gap-3">
                    {/* Search Bar */}
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search listings..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                        />
                    </div>

                    {/* Filter & View Options */}
                    <div className="flex gap-2">
                        <button className="flex items-center gap-2 px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors">
                            <SlidersHorizontal className="w-5 h-5 text-gray-600" />
                            <span className="hidden sm:inline text-sm font-medium text-gray-700">
                                Filters
                            </span>
                        </button>
                        <div className="flex bg-gray-50 rounded-xl border border-gray-200 p-1">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-100'}`}
                            >
                                <Grid className="w-5 h-5 text-gray-600" />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-100'}`}
                            >
                                <List className="w-5 h-5 text-gray-600" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
