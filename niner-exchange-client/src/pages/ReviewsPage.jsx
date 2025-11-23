import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, User, Calendar, MessageSquare } from 'lucide-react';
import { fetchReviews, fetchUserProfile } from '../services/reviewsApi.js';
import ReviewStats from '../components/reviews/ReviewStats';
import RatingBreakdown from '../components/reviews/RatingBreakdown';
import ReviewList from '../components/reviews/ReviewList';

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
            <ReviewStats
                userInfo={userInfo}
                stats={stats}
                renderStars={renderStars}
            />

            <section className="py-12 sm:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-1">
                            <RatingBreakdown stats={stats} />
                        </div>

                        <div className="lg:col-span-2 space-y-6">
                            <ReviewList
                                reviews={reviews}
                                renderStars={renderStars}
                                formatDate={formatDate}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
