import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, User, Calendar, MessageSquare } from 'lucide-react';
import { fetchReviews, fetchUserProfile } from '../services/reviewsApi.js';

export default function ReviewsPage() {
    const { userId } = useParams();
    const [reviews, setReviews] = useState([]);
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        averageRating: 0,
        totalReviews: 0,
        ratingBreakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
    });

    useEffect(() => {
        if (!userId) {
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            try {
                setLoading(true);

                const [userData, reviewsData] = await Promise.all([
                    fetchUserProfile(userId),
                    fetchReviews(userId),
                ]);

                setUserInfo(userData);
                setReviews(reviewsData);

                setStats({
                    averageRating: userData.avg_rating || 0,
                    totalReviews: userData.review_count || 0,
                    ratingBreakdown: userData.rating_breakdown || {
                        5: 0,
                        4: 0,
                        3: 0,
                        2: 0,
                        1: 0,
                    },
                });
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [userId]);

    const renderStars = (rating) => {
        return (
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        className={`w-5 h-5 ${
                            star <= rating
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-gray-300'
                        }`}
                    />
                ))}
            </div>
        );
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
                <div className="text-emerald-600 text-xl">
                    Loading reviews...
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-emerald-700 via-emerald-600 to-emerald-500 text-white py-12 sm:py-16 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-amber-400 rounded-full -translate-x-48 -translate-y-48"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-800 rounded-full translate-x-48 translate-y-48"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-emerald-600">
                            <User className="w-10 h-10" />
                        </div>
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-bold mb-1">
                                {userInfo?.first_name} {userInfo?.last_name}
                            </h1>
                            <p className="text-emerald-100">
                                {userInfo?.email}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-6 items-center">
                        <div className="flex items-center gap-3">
                            {renderStars(Math.round(stats.averageRating))}
                            <span className="text-2xl font-bold">
                                {stats.averageRating}
                            </span>
                        </div>
                        <div className="text-emerald-100">
                            {stats.totalReviews}{' '}
                            {stats.totalReviews === 1 ? 'Review' : 'Reviews'}
                        </div>
                    </div>
                </div>
            </section>

            {/* Reviews Section */}
            <section className="py-12 sm:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Rating Breakdown */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl shadow-lg p-6 top-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-6">
                                    Rating Breakdown
                                </h3>
                                <div className="space-y-3">
                                    {[5, 4, 3, 2, 1].map((rating) => {
                                        const count =
                                            stats.ratingBreakdown[rating];
                                        const percentage =
                                            stats.totalReviews > 0
                                                ? (count / stats.totalReviews) *
                                                  100
                                                : 0;
                                        return (
                                            <div
                                                key={rating}
                                                className="flex items-center gap-3"
                                            >
                                                <span className="text-sm font-medium text-gray-700 w-12">
                                                    {rating}{' '}
                                                    <Star className="w-3 h-3 inline fill-amber-400 text-amber-400" />
                                                </span>
                                                <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-gradient-to-r from-amber-400 to-amber-500 transition-all"
                                                        style={{
                                                            width: `${percentage}%`,
                                                        }}
                                                    ></div>
                                                </div>
                                                <span className="text-sm text-gray-600 w-8">
                                                    {count}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Reviews List */}
                        <div className="lg:col-span-2 space-y-6">
                            {reviews.length === 0 ? (
                                <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                                    <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                                        No Reviews Yet
                                    </h3>
                                    <p className="text-gray-600">
                                        This user hasn't received any reviews.
                                    </p>
                                </div>
                            ) : (
                                reviews.map((review) => (
                                    <div
                                        key={review.review_id}
                                        className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                                    >
                                        {/* Reviewer Info & Rating */}
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                {/* ... (Reviewer Avatar) ... */}
                                                <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-full flex items-center justify-center text-emerald-700 font-bold">
                                                    {
                                                        review.reviewer
                                                            .first_name[0]
                                                    }
                                                    {
                                                        review.reviewer
                                                            .last_name[0]
                                                    }
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-gray-900">
                                                        {
                                                            review.reviewer
                                                                .first_name
                                                        }{' '}
                                                        {
                                                            review.reviewer
                                                                .last_name
                                                        }
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
                                                        review.listing
                                                            .cover_image
                                                            .image ||
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
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
