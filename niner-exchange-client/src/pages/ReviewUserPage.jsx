/*
 *  Used AI to generate the UI based on the design based in our figma design and help with user validations
 *
 * */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Send, AlertCircle } from 'lucide-react';
import { createReviews } from '../services/reviewsApi.js';
import { fetchTransaction } from '../services/transactionsApi.js';
import { useAuth } from '../context/AuthContext.jsx';
import {
    collection,
    getDocs,
    query,
    where,
    deleteDoc,
} from 'firebase/firestore';
import { db } from '../firebase.js';

export default function SubmitReviewPage() {
    const { revieweeId, transactionId } = useParams();
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // State for the data we will fetch
    const [transaction, setTransaction] = useState(null);
    const [reviewee, setReviewee] = useState(null);
    const [reviewer, setReviewer] = useState(null);

    // This useEffect fetches all the data the page needs
    useEffect(() => {
        if (!transactionId || !revieweeId || !currentUser) {
            console.error(revieweeId);
            return;
        }

        const loadTransaction = async () => {
            try {
                const data = await fetchTransaction(transactionId);
                setTransaction(data);

                if (
                    data.buyer.id === revieweeId &&
                    data.seller.id === currentUser.id
                ) {
                    setReviewee(data.buyer);
                    setReviewer(data.seller);
                } else if (
                    data.seller.id === revieweeId &&
                    data.buyer.id === currentUser.id
                ) {
                    setReviewee(data.seller);
                    setReviewer(data.buyer);
                } else {
                    setError(
                        'You do not have permission to review this transaction.',
                    );
                    throw new Error('User mismatch');
                }
            } catch (err) {
                setError(err.message || 'Could not load transaction details.');
            }
        };

        loadTransaction();
    }, [transactionId, revieweeId, currentUser]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (rating === 0) {
            setError('Please select a rating');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const reviewData = {
                transaction: transactionId,
                reviewee: revieweeId,
                rating: rating,
                comment: comment,
            };

            await createReviews(reviewData);

            try {
                const notifQuery = query(
                    collection(db, 'notifications'),
                    where('userId', '==', currentUser.id),
                    where('transactionId', '==', transactionId),
                );

                const querySnapshot = await getDocs(notifQuery);

                querySnapshot.forEach((doc) => {
                    deleteDoc(doc.ref);
                });
            } catch (notifError) {
                console.error('Failed to delete notification:', notifError);
            }

            navigate(`/home`);
        } catch (err) {
            setError('Failed to submit review. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const renderStar = (index) => {
        const filled = index <= (hoveredRating || rating);
        return (
            <button
                type="button"
                key={index}
                onClick={() => setRating(index)}
                onMouseEnter={() => setHoveredRating(index)}
                onMouseLeave={() => setHoveredRating(0)}
                className="transition-transform hover:scale-110 focus:outline-none"
            >
                <Star
                    className={`w-12 h-12 transition-colors ${
                        filled
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-gray-300 hover:text-amber-200'
                    }`}
                />
            </button>
        );
    };

    if (error) {
        return (
            <div className="min-h-screen ...">
                <div className="text-red-600 text-xl">{error}</div>
            </div>
        );
    }

    if (!transaction || !reviewee || !reviewer) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
                <div className="text-emerald-600 text-xl">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <section className="bg-gradient-to-br from-emerald-700 via-emerald-600 to-emerald-500 text-white py-12 sm:py-16 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-amber-400 rounded-full -translate-x-48 -translate-y-48"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-800 rounded-full translate-x-48 translate-y-48"></div>
                </div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
                    <h1 className="text-3xl sm:text-4xl font-bold mb-2">
                        Leave a Review
                    </h1>
                    <p className="text-emerald-100 text-lg">
                        Share your experience with the UNCC community
                    </p>
                </div>
            </section>

            <section className="py-12 sm:py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">
                            Your Transaction with {reviewee.first_name}
                        </h2>
                        <div className="flex items-start gap-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-full flex items-center justify-center text-emerald-700 font-bold text-xl flex-shrink-0">
                                {reviewee.first_name[0]}
                                {reviewee.last_name[0]}
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-gray-900 text-lg">
                                    {reviewee.first_name} {reviewee.last_name}
                                </h3>
                                <p className="text-gray-600 text-sm mb-2">
                                    {reviewee.email}
                                </p>
                                <div className="bg-gray-50 rounded-lg p-3 mt-3">
                                    <p className="text-sm text-gray-600 mb-1">
                                        Item
                                    </p>
                                    <p className="font-semibold text-gray-900">
                                        {transaction.listing.title}
                                    </p>
                                    <p className="text-emerald-600 font-bold mt-1">
                                        ${transaction.final_price}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                                <p className="text-red-700 text-sm">{error}</p>
                            </div>
                        )}

                        <div className="mb-8">
                            <label className="block text-lg font-bold text-gray-900 mb-4">
                                How would you rate your experience?
                                <span className="text-red-500 ml-1">*</span>
                            </label>
                            <div className="flex gap-2 justify-center sm:justify-start">
                                {[1, 2, 3, 4, 5].map((index) =>
                                    renderStar(index),
                                )}
                            </div>
                            {rating > 0 && (
                                <p className="mt-3 text-gray-600 text-center sm:text-left">
                                    {rating === 1 && 'Poor'}
                                    {rating === 2 && 'Fair'}
                                    {rating === 3 && 'Good'}
                                    {rating === 4 && 'Very Good'}
                                    {rating === 5 && 'Excellent'}
                                </p>
                            )}
                        </div>

                        <div className="mb-8">
                            <label className="block text-lg font-bold text-gray-900 mb-3">
                                Share your experience
                            </label>
                            <span className="text-red-500 ml-1">*</span>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Tell us about your transaction with this user. What went well? What could be improved?"
                                rows="6"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors resize-none text-gray-900 placeholder-gray-400"
                                maxLength="1000"
                            />
                            <p className="text-sm text-gray-500 mt-2 text-right">
                                {comment.length}/1000 characters
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={loading || rating === 0}
                                className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-emerald-700 hover:to-emerald-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-5 h-5" />
                                        Submit Review
                                    </>
                                )}
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-bold text-lg hover:border-gray-400 hover:bg-gray-50 transition-all"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>

                    <div className="mt-8 bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
                        <h3 className="font-bold text-emerald-900 mb-3 flex items-center gap-2">
                            <AlertCircle className="w-5 h-5" />
                            Review Guidelines
                        </h3>
                        <ul className="space-y-2 text-sm text-emerald-800">
                            <li>• Be honest and fair in your assessment</li>
                            <li>• Focus on your transaction experience</li>
                            <li>• Avoid offensive or inappropriate language</li>
                            <li>• Reviews cannot be edited once submitted</li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
}
