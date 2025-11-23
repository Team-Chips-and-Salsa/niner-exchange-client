/*
 *  Used AI to generate the UI based on the design based in our figma design and help with user validations
 *
 * */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
import TransactionInfo from '../components/reviews/TransactionInfo';
import ReviewForm from '../components/reviews/ReviewForm';
import ReviewGuidelines from '../components/reviews/ReviewGuidelines';

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

        if (!comment.trim()) {
            setError('Please share your experience');
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
                    {/* Transaction Info Card */}
                    <TransactionInfo
                        reviewee={reviewee}
                        transaction={transaction}
                    />

                    {/* Review Form */}
                    <ReviewForm
                        rating={rating}
                        setRating={setRating}
                        hoveredRating={hoveredRating}
                        setHoveredRating={setHoveredRating}
                        comment={comment}
                        setComment={setComment}
                        loading={loading}
                        error={error}
                        handleSubmit={handleSubmit}
                        navigate={navigate}
                    />

                    {/* Guidelines */}
                    <ReviewGuidelines />
                </div>
            </section>
        </div>
    );
}
