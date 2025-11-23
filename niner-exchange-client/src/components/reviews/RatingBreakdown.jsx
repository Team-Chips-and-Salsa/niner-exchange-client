import React from 'react';
import { Star } from 'lucide-react';

export default function RatingBreakdown({ stats }) {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 top-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
                Rating Breakdown
            </h3>
            <div className="space-y-3">
                {[5, 4, 3, 2, 1].map((rating) => {
                    const count = stats.ratingBreakdown[rating];
                    const percentage =
                        stats.totalReviews > 0
                            ? (count / stats.totalReviews) * 100
                            : 0;
                    return (
                        <div key={rating} className="flex items-center gap-3">
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
    );
}
