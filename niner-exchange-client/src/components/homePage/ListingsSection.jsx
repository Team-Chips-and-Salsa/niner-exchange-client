import { BookOpen, Briefcase, ChevronRight, Clock, Home, Package, Star } from 'lucide-react';
import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

const listingTypes = [
    { id: 'ALL', title: 'All', icon: Package },
    { id: 'TEXTBOOK', title: 'Textbooks', icon: BookOpen },
    { id: 'SUBLEASE', title: 'Housing', icon: Home },
    { id: 'ITEM', title: 'Marketplace', icon: Package },
    { id: 'SERVICE', title: 'Services', icon: Briefcase },
];

function getInitials(name) {
    if (!name) return '??';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

function getTimeAgo(date) {
    if (!date) return '';
    const now = new Date();
    const posted = new Date(date);
    const diffMs = now - posted;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 14) return '1 week ago';
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 60) return '1 month ago';
    return `${Math.floor(diffDays / 30)} months ago`;
}

export default function ListingsSection({ listings }) {
    const { search } = useLocation();

    const queryParams = useMemo(() => {
        return new URLSearchParams(search);
    }, [search]);

    const activeListingType = queryParams.get('listing_type') || '';

    function getPriceUnitLabel(listing) {
        if (listing.listing_type === 'SERVICE') {
            if (listing.rate_type === 'HOURLY') return "/hr";
            else if (listing.rate_type === 'PERSON') return "/person";
            else if (listing.rate_type === 'GROUP') return "/group";
            else if (listing.rate_type === 'UNIT') return "/unit";
        }
        if (listing.listing_type === 'SUBLEASE') return '/mo';
        return '';
    }

    return (
        <section className="py-16 sm:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-2">
                            {activeListingType === ''
                                ? 'All Listings'
                                : listingTypes.find((c) => c.id === activeListingType)?.title}
                        </h3>
                        <p className="text-gray-600">
                            Fresh opportunities from your peers - {listings.length} listings
                        </p>
                    </div>
                    <button className="text-emerald-600 font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                        View All <ChevronRight className="w-5 h-5" />
                    </button>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {listings.map((listing) => (
                        <div
                            key={listing.listing_id}
                            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden"
                        >
                            {/* Image */}
                            <div className="h-52 bg-gray-100 overflow-hidden">
                                {listing.images?.[0]?.image ? (
                                    <img
                                        src={listing.images[0].image}
                                        alt={listing.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                                        No Image Available
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                {/* Title */}
                                <h4 className="font-bold text-gray-900 text-lg mb-2 line-clamp-1">
                                    {listing.title}
                                </h4>

                                {/* Price */}
                                <div className="mb-4">
                                    <span className="text-2xl font-bold text-emerald-600">
                                        ${listing?.price || '0.00'}
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        {getPriceUnitLabel(listing)}
                                    </span>
                                </div>

                                {/* Seller Info */}
                                <Link to={`/profile/${listing.seller?.id}`} className="block mb-4 group">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center text-white text-sm font-medium group-hover:bg-emerald-500">
                                        {(listing.seller?.first_name?.[0] || '') + (listing.seller?.last_name?.[0] || '')}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900 group-hover:underline">
                                            {`${listing.seller?.first_name || ''} ${listing.seller?.last_name || ''}`}
                                        </p>
                                        <div className="flex items-center gap-1 text-xs text-gray-500 group-hover:underline">
                                            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                            <span>{listing.seller?.avg_rating  || 0} reviews</span>
                                        </div>
                                    </div>
                                </div>
                                </Link>

                                {/* Time Posted */}
                                <div className="flex items-center gap-1 text-sm text-gray-500 mb-4">
                                    <Clock className="w-4 h-4" />
                                    <span>{getTimeAgo(listing.created_at)}</span>
                                </div>

                                {/* View Button */}
                                <Link
                                    to={`/listing/${listing.listing_id}`}
                                    className="block w-24 bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors text-sm text-center"
                                >
                                    View
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}