import React from 'react';
import { User, Calendar, Award, Edit, Package } from 'lucide-react';



export default function ProfileHeader({
    userData,
    formatDate,
    getRelativeTime,
}) {
    return (
        <div className="bg-white border border-gray-200 rounded-lg p-8 mb-6 shadow-sm">
            <div className="flex items-start justify-between">
                <div className="flex items-start gap-6">
                    {/* Profile Picture */}
                    <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center border-2 border-emerald-200">
                        {userData.profile_image_url ? (
                            <img
                                src={userData.profile_image_url}
                                alt="Profile"
                                className="w-full h-full rounded-full object-cover"
                            />
                        ) : (
                            <User size={48} className="text-emerald-600" />
                        )}
                    </div>

                    {/* User Info */}
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold text-gray-900 mb-1">
                            {userData.first_name} {userData.last_name}
                        </h1>
                        <p className="text-gray-600 mb-3">{userData.email}</p>

                        {userData.bio && (
                            <p className="text-gray-700 mb-4 max-w-2xl">
                                {userData.bio}
                            </p>
                        )}

                        <div className="flex flex-wrap gap-6 text-sm">
                            <div className="flex items-center gap-2">
                                <Calendar size={16} className="text-gray-500" />
                                <span className="text-gray-700">
                                    Joined {formatDate(userData.date_joined)}
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <Award size={16} className="text-yellow-500" />
                                <span className="text-gray-700">
                                    <span className="font-semibold">
                                        {userData.avg_rating.toFixed(1)}
                                    </span>{' '}
                                    rating ({userData.review_count}{' '}
                                    {userData.review_count === 1
                                        ? 'review'
                                        : 'reviews'}
                                    )
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <Package
                                    size={16}
                                    className="text-emerald-500"
                                />
                                <span className="text-gray-700">
                                    <span className="font-semibold">
                                        {userData.items_sold_count}
                                    </span>{' '}
                                    items sold
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <div
                                    className={`w-2 h-2 rounded-full ${userData.status === 'ACTIVE' ? 'bg-green-500' : 'bg-gray-400'}`}
                                ></div>
                                <span className="text-gray-700">
                                    Active{' '}
                                    {getRelativeTime(userData.last_active)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Edit Button */}
                <button className="flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors">
                    <Edit size={16} />
                    <span className="font-medium">Edit Profile</span>
                </button>
            </div>
        </div>
    );
}
