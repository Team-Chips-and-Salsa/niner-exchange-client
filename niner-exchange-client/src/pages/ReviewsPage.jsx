import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, User, Calendar, MessageSquare } from 'lucide-react';

export default function ReviewsPage() {
    const { userId } = useParams();
    const [reviews, setReviews] = useState([]);
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        averageRating: 0,
        totalReviews: 0,
        ratingBreakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
    });

    useEffect(() => {
        const fetchUserReviews = async () => {
            try {
                // const response = await fetch(`/api/users/${userId}/reviews/`);
                // const data = await response.json();

                // Mock data for demonstration
                const mockData = {
                    user: {
                        email: 'student@uncc.edu',
                        first_name: 'John',
                        last_name: 'Doe'
                    },
                    reviews: [
                        {
                            review_id: '1',
                            reviewer: { email: 'buyer1@uncc.edu', first_name: 'Alice', last_name: 'Smith' },
                            rating: 5,
                            comment: 'Great seller! Item was exactly as described and delivery was prompt.',
                            created_at: '2024-11-10T10:30:00Z'
                        },
                        {
                            review_id: '2',
                            reviewer: { email: 'buyer2@uncc.edu', first_name: 'Bob', last_name: 'Johnson' },
                            rating: 4,
                            comment: 'Good experience overall. Communication could have been better.',
                            created_at: '2024-11-08T14:20:00Z'
                        },
                        {
                            review_id: '3',
                            reviewer: { email: 'buyer3@uncc.edu', first_name: 'Carol', last_name: 'Williams' },
                            rating: 5,
                            comment: 'Excellent transaction! Highly recommend.',
                            created_at: '2024-11-05T09:15:00Z'
                        },
                        {
                            review_id: '4',
                            reviewer: { email: 'buyer4@uncc.edu', first_name: 'David', last_name: 'Brown' },
                            rating: 3,
                            comment: 'Average experience. Item was fine but took longer than expected.',
                            created_at: '2024-11-01T16:45:00Z'
                        }
                    ]
                };

                setUserInfo(mockData.user);
                setReviews(mockData.reviews);

                // Calculate stats
                const total = mockData.reviews.length;
                const sum = mockData.reviews.reduce((acc, review) => acc + review.rating, 0);
                const avg = total > 0 ? (sum / total).toFixed(1) : 0;

                const breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
                mockData.reviews.forEach(review => {
                    breakdown[review.rating]++;
                });

                setStats({
                    averageRating: avg,
                    totalReviews: total,
                    ratingBreakdown: breakdown
                });

                setLoading(false);
            } catch (error) {
                console.error('Error fetching reviews:', error);
                setLoading(false);
            }
        };

        fetchUserReviews();
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
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
                <div className="text-emerald-600 text-xl">Loading reviews...</div>
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
                            <p className="text-emerald-100">{userInfo?.email}</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-6 items-center">
                        <div className="flex items-center gap-3">
                            {renderStars(Math.round(stats.averageRating))}
                            <span className="text-2xl font-bold">{stats.averageRating}</span>
                        </div>
                        <div className="text-emerald-100">
                            {stats.totalReviews} {stats.totalReviews === 1 ? 'Review' : 'Reviews'}
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
                            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-6">
                                    Rating Breakdown
                                </h3>
                                <div className="space-y-3">
                                    {[5, 4, 3, 2, 1].map((rating) => {
                                        const count = stats.ratingBreakdown[rating];
                                        const percentage = stats.totalReviews > 0
                                            ? (count / stats.totalReviews) * 100
                                            : 0;
                                        return (
                                            <div key={rating} className="flex items-center gap-3">
                                                <span className="text-sm font-medium text-gray-700 w-12">
                                                    {rating} <Star className="w-3 h-3 inline fill-amber-400 text-amber-400" />
                                                </span>
                                                <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-gradient-to-r from-amber-400 to-amber-500 transition-all"
                                                        style={{ width: `${percentage}%` }}
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
                                        <div className="flex items-start justify-between mb-4">
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

                                        {review.comment && (
                                            <p className="text-gray-700 mb-4 leading-relaxed">
                                                {review.comment}
                                            </p>
                                        )}

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