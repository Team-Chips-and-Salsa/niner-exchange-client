import { Clock, DollarSign, Heart, MapPin, Share2 } from 'lucide-react';
import React from 'react';

export default function ListingsGrid({
    filteredListings,
    viewMode,
    categories,
}) {
    return (
        <div
            className={
                viewMode === 'grid'
                    ? 'grid sm:grid-cols-2 lg:grid-cols-3 gap-5'
                    : 'space-y-4'
            }
        >
            {filteredListings.map((listing) => (
                <div
                    key={listing.id}
                    className={`bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-xl transition-all cursor-pointer group overflow-hidden ${
                        viewMode === 'list' ? 'flex' : ''
                    }`}
                >
                    {/* Image Section */}
                    <div
                        className={`bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative ${
                            viewMode === 'list' ? 'w-48 h-48' : 'h-56'
                        }`}
                    >
                        <div className="text-6xl group-hover:scale-110 transition-transform">
                            {listing.image}
                        </div>

                        {/* Overlay Actions */}
                        <div className="absolute top-3 right-3 flex gap-2">
                            <button className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors">
                                <Heart className="w-4 h-4 text-gray-700" />
                            </button>
                            <button className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors">
                                <Share2 className="w-4 h-4 text-gray-700" />
                            </button>
                        </div>

                        {/* Category Badge */}
                        <div className="absolute top-3 left-3">
                            <span className="px-3 py-1 bg-white bg-opacity-90 backdrop-blur-sm rounded-full text-xs font-semibold text-emerald-700">
                                {
                                    categories.find(
                                        (c) => c.id === listing.category,
                                    )?.label
                                }
                            </span>
                        </div>

                        {/* Verified Badge */}
                        {listing.verified && (
                            <div className="absolute bottom-3 left-3">
                                <span className="px-3 py-1 bg-emerald-600 text-white rounded-full text-xs font-bold flex items-center gap-1">
                                    ✓ Verified
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Content Section */}
                    <div className="p-5 flex-1">
                        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                            {listing.title}
                        </h3>

                        {/* Price */}
                        <div className="mb-3">
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-bold text-emerald-600">
                                    ${listing.price}
                                </span>
                                {listing.priceType && (
                                    <span className="text-sm text-gray-500">
                                        {listing.priceType}
                                    </span>
                                )}
                            </div>
                            {listing.originalPrice && (
                                <span className="text-sm text-gray-400 line-through">
                                    ${listing.originalPrice}
                                </span>
                            )}
                        </div>

                        {/* Seller Info */}
                        <div className="flex items-center gap-2 mb-3 text-sm">
                            <div className="w-8 h-8 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-full flex items-center justify-center text-white font-bold text-xs">
                                {listing.seller
                                    .split(' ')
                                    .map((n) => n[0])
                                    .join('')}
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">
                                    {listing.seller}
                                </p>
                                <div className="flex items-center gap-1">
                                    <span className="text-amber-500">★</span>
                                    <span className="text-gray-600 text-xs">
                                        {listing.sellerRating}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Meta Info */}
                        <div className="space-y-2 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                <span>{listing.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>{listing.timePosted}</span>
                            </div>
                            {(listing.condition || listing.details) && (
                                <div className="flex items-center gap-2">
                                    <DollarSign className="w-4 h-4" />
                                    <span>
                                        {listing.condition || listing.details}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                                <Heart className="w-3 h-3" />
                                {listing.saves} saves
                            </span>
                            <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors text-sm">
                                View Details
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
