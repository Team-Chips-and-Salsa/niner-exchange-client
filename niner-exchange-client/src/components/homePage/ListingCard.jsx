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
        reviewCount === 0 ? 'No reviews' : `${reviewCount} rating`;

    return (
        <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden block group relative">
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
                    <Link
                        to={`/listing/${listing.listing_id}`}
                        className="before:absolute before:inset-0 focus:outline-none"
                    >
                        {listing.title}
                    </Link>
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
                <div className="mb-4 relative z-10">
                    <Link
                    to={`/profile/${listing.seller?.id}`}
                    className="block mb-4 group"
                >
                    {console.log(listing.seller.profile_image_url)}
                    <div className="flex items-center space-x-3 mb-3 group/seller">
                        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center group-hover/seller:bg-emerald-200">
                            {listing.seller.profile_image_url ? (
                                <img
                                    src={listing.seller.profile_image_url}
                                    alt="Profile"
                                    className="w-full h-full rounded-full object-cover group-hover/seller:brightness-90"
                                />
                            ) : (
                                <p className="text-1xl font-bold text-emerald-600">
                                    {`${listing.seller.first_name?.[0] || ''}${listing.seller.last_name?.[0] || ''}`.toUpperCase()}
                                </p>
                            )}
                        </div>
                        <div>
                            <p className="font-medium text-gray-900 group-hover/seller:underline">
                                {`${listing.seller.first_name} ${listing.seller.last_name}`}
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
        </div>
    );
}
