import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MessageSquare, Calendar, Flag } from 'lucide-react';

export default function ReviewList({ reviews, renderStars, formatDate }) {
    const navigate = useNavigate();

    const handleReport = (reviewerId) => {
        if (reviewerId) {
            navigate(`/report/user/${reviewerId}`);
        }
    };

    if (reviews.length === 0) {
        return (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                    No Reviews Yet
                </h3>
                <p className="text-gray-600">
                    This user hasn't received any reviews.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {reviews.map((review) => (
                <div
                    key={review.review_id}
                    className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow relative"
                >
                    <button
                        onClick={() => handleReport(review.reviewer.id)}
                        className="absolute top-6 right-6 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
                        title="Report User"
                    >
                        <Flag className="w-5 h-5" />
                    </button>

                    {/* Reviewer Info & Rating */}
                    <div className="flex items-start justify-between mb-4 pr-12">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-full flex items-center justify-center text-emerald-700 font-bold">
                                {review.reviewer.first_name[0]}
                                {review.reviewer.last_name[0]}
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">
                                    {review.reviewer.first_name}{' '}
                                    {review.reviewer.last_name}
                                </h4>
                                <p className="text-sm text-gray-500">
                                    {review.reviewer.email}
                                </p>
                            </div>
                        </div>
                        {renderStars(review.rating)}
                    </div>

                    {/* Listing Info */}
                    <Link
                        to={`/listing/${review.listing.listing_id}`}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors my-4"
                    >
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0 overflow-hidden">
                            <img
                                src={
                                    review.listing.cover_image.image ||
                                    '/img/placeholder.png'
                                }
                                alt={review.listing.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">
                                Reviewed Listing:
                            </p>
                            <p className="text-sm font-semibold text-gray-800">
                                {review.listing.title}
                            </p>
                        </div>
                    </Link>

                    {/* Review Comment */}
                    {review.comment && (
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            {review.comment}
                        </p>
                    )}

                    {/* Date */}
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        {formatDate(review.created_at)}
                    </div>
                </div>
            ))}
        </div>
    );
}
