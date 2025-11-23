import React from 'react';
import { Send, AlertCircle, Star } from 'lucide-react';

export default function ReviewForm({
    rating,
    setRating,
    hoveredRating,
    setHoveredRating,
    comment,
    setComment,
    loading,
    error,
    handleSubmit,
    navigate,
}) {
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

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            {/* Error Message */}
            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-red-700 text-sm">{error}</p>
                </div>
            )}

            {/* Rating Selection */}
            <div className="mb-8">
                <label className="block text-lg font-bold text-gray-900 mb-4">
                    How would you rate your experience?
                    <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="flex gap-2 justify-center sm:justify-start">
                    {[1, 2, 3, 4, 5].map((index) => renderStar(index))}
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

            {/* Comment Box */}
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

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row gap-4">
                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading || rating === 0 || !comment.trim()}
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
    );
}
