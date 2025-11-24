import React from 'react';
import { User, Star } from 'lucide-react';

export default function ReviewStats({ userInfo, stats, renderStars }) {
    return (
        <section className="bg-gradient-to-br from-emerald-700 via-emerald-600 to-emerald-500 text-white py-12 sm:py-16 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-96 h-96 bg-amber-400 rounded-full -translate-x-48 -translate-y-48"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-800 rounded-full translate-x-48 translate-y-48"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-emerald-600">
                        {/* <User className="w-10 h-10" /> */}
                        <img
                            src={userInfo.profile_image_url}
                            alt="Profile"
                            className="w-full h-full rounded-full object-cover group-hover/seller:brightness-90"
                        />
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
    );
}
