import React, { useState, useEffect } from 'react';
import {
    User,
    Calendar,
    Award,
    Edit,
    Package,
    ShoppingBag,
    Loader2,
} from 'lucide-react';
import { useParams } from 'react-router-dom';

import ProfileHeader from '../components/userProfile/profileHeader';
import ProfilePurchaseBuyerTab from '../components/userProfile/profilePurchaseBuyerTab';
import NoListingsCard from '../components/userProfile/NoListingsCard';
import ListingsGrid from '../components/SearchPage/ListingsGrid';
import {
    fetchUserProfile,
    fetchCurrentListings,
    fetchSoldListings,
    fetchPurchaseHistory,
} from '../services/userApi';
import { set } from 'date-fns';
import { useAuth } from '../context/AuthContext';

const UserProfilePage = () => {
    const { userId } = useParams();
    const { currentUser: authUser, refreshUser } = useAuth();
    const [activeTab, setActiveTab] = useState('seller');
    const isOwner = String(authUser?.id) === String(userId);

    const [userData, setUserData] = useState(null);

    const LISTING_STATUS = {
        ACTIVE: 'ACTIVE',
        SOLD: 'SOLD',
        // REMOVE: "REMOVE", // Only need statuses used for filtering
    };

    const handleProfileUpdate = async (updatedUser) => {
        setUserData(updatedUser);
        await refreshUser();
    };

    useEffect(() => {
        if (userId) {
            const loadProfile = async () => {
                try {
                    const profileData = await fetchUserProfile(userId);
                    setUserData(profileData);
                } catch (e) {
                    console.error('Failed to fetch profile:', e);
                }
            };
            loadProfile();
        }
    }, [userId]);

    const [listingLimit, setListingLimit] = useState(10);

    const [currentListings, setCurrentListings] = useState([]);
    const [archivedListings, setArchivedListings] = useState([]);

    useEffect(() => {
        if (!userId) return;

        const loadListings = async () => {
            try {
                const current = await fetchCurrentListings(userId);

                setCurrentListings(current);
            } catch (e) {
                console.error('Failed to fetch or process listings:', e);
            }
        };
        loadListings();
    }, [userId]);

    useEffect(() => {
        if (!userId) return;

        const loadListings = async () => {
            try {
                const sold = await fetchSoldListings(userId);

                setArchivedListings(sold);
            } catch (e) {
                console.error('Failed to fetch or process listings:', e);
            }
        };
        loadListings();
    }, [userId]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const getRelativeTime = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 30) return `${diffDays}d ago`;
        return formatDate(dateString);
    };

    const [history, setHistory] = useState([]);

    useEffect(() => {
        if (!userId) return; // Guard clause

        const loadListings = async () => {
            try {
                const purchaseHistory = await fetchPurchaseHistory(userId);

                setHistory(purchaseHistory);
            } catch (e) {
                console.error('Failed to fetch or process listings:', e);
            }
        };
        loadListings();
    }, [userId]);

    if (!userData) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center">
                <Loader2 className="w-12 h-12 text-emerald-600 animate-spin mb-4" />
                <p className="text-gray-500 font-medium">Loading profile...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6">
                {/* Profile Header Section */}
                <ProfileHeader
                    userData={userData}
                    formatDate={formatDate}
                    getRelativeTime={getRelativeTime}
                    isOwner={isOwner}
                    onProfileUpdate={handleProfileUpdate}
                />

                <ProfilePurchaseBuyerTab
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />

                {activeTab === 'seller' && (
                    <div>
                        <div className="mb-10">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    Current Listings
                                </h2>
                                <select
                                    value={listingLimit}
                                    onChange={(e) =>
                                        setListingLimit(Number(e.target.value))
                                    }
                                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium bg-white hover:border-gray-400 transition-colors w-full sm:w-auto"
                                >
                                    <option value={10}>Show 10</option>
                                    <option value={20}>Show 20</option>
                                    <option value={50}>Show 50</option>
                                </select>
                            </div>

                            {currentListings.length > 0 ? (
                                <ListingsGrid
                                    listings={currentListings.slice(
                                        0,
                                        listingLimit,
                                    )}
                                    viewMode="grid"
                                />
                            ) : (
                                <NoListingsCard message="No active listings to display." />
                            )}
                        </div>

                        <div>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    Sold Listings
                                </h2>
                                <select
                                    value={listingLimit}
                                    onChange={(e) =>
                                        setListingLimit(Number(e.target.value))
                                    }
                                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium bg-white hover:border-gray-400 transition-colors w-full sm:w-auto"
                                >
                                    <option value={10}>Show 10</option>
                                    <option value={20}>Show 20</option>
                                    <option value={50}>Show 50</option>
                                </select>
                            </div>

                            {archivedListings.length > 0 ? (
                                <ListingsGrid
                                    listings={archivedListings.slice(
                                        0,
                                        listingLimit,
                                    )}
                                    viewMode="grid"
                                />
                            ) : (
                                <NoListingsCard message="No sold listings to display." />
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'buyer' && (
                    <div className="mb-10">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                            <h2 className="text-2xl font-bold text-gray-900">
                                Purchase History
                            </h2>
                            <select
                                value={listingLimit}
                                onChange={(e) =>
                                    setListingLimit(Number(e.target.value))
                                }
                                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium bg-white hover:border-gray-400 transition-colors w-full sm:w-auto"
                            >
                                <option value={10}>Show 10</option>
                                <option value={20}>Show 20</option>
                                <option value={50}>Show 50</option>
                            </select>
                        </div>

                        {history.length > 0 ? (
                            <ListingsGrid
                                listings={history.slice(0, listingLimit)}
                                viewMode="grid"
                            />
                        ) : (
                            <NoListingsCard message="No purchase history found." />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserProfilePage;
