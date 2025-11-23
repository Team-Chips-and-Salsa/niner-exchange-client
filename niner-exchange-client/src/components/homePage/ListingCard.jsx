import { Clock, Star } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

function getPriceUnitLabel(listing) {
    if (listing.listing_type === 'SERVICE') {
        if (listing.rate_type === 'HOURLY') return '/hr';
        else if (listing.rate_type === 'PERSON') return '/person';
        else if (listing.rate_type === 'GROUP') return '/group';
        else if (listing.rate_type === 'UNIT') return '/unit';
    }
    if (listing.listing_type === 'SUBLEASE') return '/mo';
    return '';
}

export default function ListingCard({ listing }) {
    const reviewCount = listing.seller?.avg_rating || 0;
    const reviewText =
        reviewCount === 0 ? 'No reviews' : `${reviewCount} reviews`;

    return (
        <Link
            to={`/listing/${listing.listing_id}`}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden block group"
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
                <h4 className="font-bold text-gray-900 group-hover:text-emerald-600 text-lg mb-2 line-clamp-1 transition-colors">
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
                <div
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                    }}
                    className="mb-4"
                >
                    <Link
                        to={`/profile/${listing.seller?.id}`}
                        className="block group/seller"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center text-white text-sm font-medium group-hover/seller:bg-emerald-500">
                                {(listing.seller?.first_name?.[0] || '') +
                                    (listing.seller?.last_name?.[0] || '')}
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900 group-hover/seller:underline">
                                    {`${listing.seller?.first_name || ''} ${listing.seller?.last_name || ''}`}
                                </p>
                                <div className="flex items-center gap-1 text-xs text-gray-500 group-hover/seller:underline">
                                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                    <span>{reviewText}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Time Posted */}
                <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>
                        {formatDistanceToNow(new Date(listing.created_at), {
                            addSuffix: true,
                        })}
                    </span>
                </div>
            </div>
        </Link>
    );
}
