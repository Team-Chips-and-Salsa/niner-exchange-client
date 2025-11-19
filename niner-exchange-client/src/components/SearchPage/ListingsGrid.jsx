import { Clock, DollarSign, Heart, MapPin } from 'lucide-react';
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';

export default function ListingsGrid({ listings, viewMode, categories }) {
    return (
        <div
            className={
                viewMode === 'grid'
                    ? 'grid sm:grid-cols-2 lg:grid-cols-3 gap-5'
                    : 'space-y-4'
            }
        >
            {listings.map((listing) => {
                const datePosted = new Date(listing.created_at);
                const timeAgo = formatDistanceToNow(datePosted, {
                    addSuffix: true,
                });

                return (
                    <div
                        key={listing.listing_id}
                        className={`bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-xl transition-all cursor-pointer group overflow-hidden ${
                            viewMode === 'list' ? 'flex' : ''
                        }`}
                    >
                        {/* Image Section */}
                        <div
                            className={`relative overflow-hidden ${
                                viewMode === 'list'
                                    ? 'w-32 sm:w-40 md:w-48 flex-shrink-0'
                                    : 'w-full'
                            }`}
                        >
                            <div
                                className={`relative w-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg ${
                                    viewMode === 'list'
                                        ? 'aspect-square'
                                        : 'aspect-[4/3] sm:aspect-video'
                                }`}
                            >
                                {listing.images?.[0]?.image ? (
                                    <img
                                        src={listing.images[0].image}
                                        alt={listing.title || 'Listing image'}
                                        className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-110"
                                        loading="lazy"
                                        decoding="async"
                                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-xs sm:text-sm text-gray-400">
                                            No Image Available
                                        </span>
                                    </div>
                                )}
                            </div>
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
                                </div>
                            </div>

                            {/* Seller Info */}
                            <div className="flex items-center gap-2 mb-3 text-sm">
                                <div className="w-8 h-8 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-full flex items-center justify-center text-white font-bold text-xs">
                                   {(listing.seller?.first_name?.[0] || '') + (listing.seller?.last_name?.[0] || '')}
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">
                                        {`${listing.seller?.first_name || ''} ${listing.seller?.last_name || ''}`}
                                    </p>
                                    <div className="flex items-center gap-1">
                                        <span className="text-amber-500">
                                            ★
                                        </span>
                                        <span className="text-gray-600 text-xs">
                                            {listing.seller?.avg_rating || '0 reviews'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Meta Info */}
                            <div className="space-y-2 text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    <span>{timeAgo}</span>
                                </div>
                                {(listing.condition || listing.details) && (
                                    <div className="flex items-center gap-2">
                                        <DollarSign className="w-4 h-4" />
                                        <span>
                                            {listing.condition ||
                                                listing.details}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                                <Link
                                    to={`/listing/${listing.listing_id}`}
                                    className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors text-sm inline-block text-center"
                                >
                                    View
                                </Link>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
