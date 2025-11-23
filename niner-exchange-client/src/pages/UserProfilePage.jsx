import React, { useState, useEffect } from 'react';
import {
    User,
    Calendar,
    Award,
    Edit,
    Package,
    ShoppingBag,
} from 'lucide-react';
import { useParams } from 'react-router-dom';

import ProfileHeader from '../components/userProfile/profileHeader';
import ProfilePurchaseBuyerTab from '../components/userProfile/profilePurchaseBuyerTab';
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
    const { currentUser: authUser } = useAuth();
    const [activeTab, setActiveTab] = useState('seller');
    const isOwner = String(authUser?.id) === String(userId);

    const [userData, setUserData] = useState(null);

    const LISTING_STATUS = {
        ACTIVE: 'ACTIVE',
        SOLD: 'SOLD',
        // REMOVE: "REMOVE", // Only need statuses used for filtering
    };

    const handleProfileUpdate = (updatedUser) => {
        setUserData(updatedUser);
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

    /*
    const [currentListings, setCurrentListings] = useState([
        {
            listing_id: 1,
            title: 'Calculus Textbook',
            price: 45.0,
            images: [{ image: null }],
            type: 'TEXTBOOK',
            status: 'ACTIVE',
            created_at: '2024-11-10T10:30:00Z',
            condition: 'Like New',
            seller: userData,
        },
        {
            listing_id: 2,
            title: 'Blue Diamond Almonds',
            price: 10.0,
            images: [{ image: null }],
            type: 'ITEM',
            status: 'ACTIVE',
            created_at: '2024-11-12T14:20:00Z',
            condition: 'New',
            seller: userData,
        },
        {
            listing_id: 3,
            title: 'Desk Lamp',
            price: 15.0,
            images: [{ image: null }],
            type: 'ITEM',
            status: 'ACTIVE',
            created_at: '2024-11-08T09:15:00Z',
            condition: 'Good',
            seller: userData,
        },
        {
            listing_id: 4,
            title: 'Chemistry Lab Coat',
            price: 20.0,
            images: [{ image: null }],
            type: 'ITEM',
            status: 'ACTIVE',
            created_at: '2024-11-13T16:45:00Z',
            condition: 'Like New',
            seller: userData,
        },
        {
            listing_id: 5,
            title: 'Studio Apartment',
            price: 850.0,
            images: [{ image: null }],
            type: 'SUBLEASE',
            status: 'ACTIVE',
            created_at: '2024-11-05T11:00:00Z',
            details: 'Near Campus',
            seller: userData,
        },
        {
            listing_id: 6,
            title: 'Tutoring Services',
            price: 25.0,
            images: [{ image: null }],
            type: 'SERVICE',
            status: 'ACTIVE',
            created_at: '2024-11-14T08:30:00Z',
            details: 'Math & Science',
            seller: userData,
        },
    ]);

    const [archivedListings, setArchivedListings] = useState([
        {
            listing_id: 7,
            title: 'Old Laptop',
            price: 200.0,
            images: [{ image: null }],
            type: 'ITEM',
            status: 'SOLD',
            created_at: '2024-10-15T10:30:00Z',
            condition: 'Fair',
            seller: userData,
        },
        {
            listing_id: 8,
            title: 'Biology Book',
            price: 30.0,
            images: [{ image: null }],
            type: 'TEXTBOOK',
            status: 'SOLD',
            created_at: '2024-10-20T14:20:00Z',
            condition: 'Good',
            seller: userData,
        },
    ]);
    */


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
        return <div>Loading profile...</div>;
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto py-8 px-6">
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
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    Current Listings
                                </h2>
                                <select
                                    value={listingLimit}
                                    onChange={(e) =>
                                        setListingLimit(Number(e.target.value))
                                    }
                                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium bg-white hover:border-gray-400 transition-colors"
                                >
                                    <option value={10}>Show 10</option>
                                    <option value={20}>Show 20</option>
                                    <option value={50}>Show 50</option>
                                </select>
                            </div>

                            <ListingsGrid
                                listings={currentListings.slice(
                                    0,
                                    listingLimit,
                                )}
                                viewMode="grid"
                            />
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    Sold Listings
                                </h2>
                                <select
                                    value={listingLimit}
                                    onChange={(e) =>
                                        setListingLimit(Number(e.target.value))
                                    }
                                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium bg-white hover:border-gray-400 transition-colors"
                                >
                                    <option value={10}>Show 10</option>
                                    <option value={20}>Show 20</option>
                                    <option value={50}>Show 50</option>
                                </select>
                            </div>

                            <ListingsGrid
                                listings={archivedListings.slice(
                                    0,
                                    listingLimit,
                                )}
                                viewMode="grid"
                            />
                        </div>
                    </div>
                )}

                {activeTab === 'buyer' && (
                    <div className="mb-10">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-bold text-gray-900">
                                Purchase History
                            </h2>
                            <select
                                value={listingLimit}
                                onChange={(e) =>
                                    setListingLimit(Number(e.target.value))
                                }
                                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium bg-white hover:border-gray-400 transition-colors"
                            >
                                <option value={10}>Show 10</option>
                                <option value={20}>Show 20</option>
                                <option value={50}>Show 50</option>
                            </select>
                        </div>

                        <ListingsGrid
                            listings={history.slice(0, listingLimit)}
                            viewMode="grid"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserProfilePage;
