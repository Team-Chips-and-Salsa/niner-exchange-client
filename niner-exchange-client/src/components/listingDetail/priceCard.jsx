import React, { useState, useMemo } from 'react';
import {
    DollarSign,
    User,
    MessageCircle,
    Pen,
    Flag,
    Trash2,
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
    collection,
    query,
    where,
    getDocs,
    addDoc,
    serverTimestamp,
} from 'firebase/firestore';
import { db } from '../../firebase.js';
import DeleteConfirmationModal from './deleteConfirmationModal';
import { deleteListing } from '../../services/listingApi';

export default function PriceCard({ listing, formatDate }) {
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    const isOwner =
        currentUser && listing && currentUser.id === listing.seller.id;
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const priceUnitLabel = useMemo(() => {
        if (listing.listing_type === 'SERVICE') {
            if (listing.rate_type === 'HOURLY') return '/hr';
            if (listing.rate_type === 'PERSON') return '/person';
            if (listing.rate_type === 'GROUP') return '/group';
            if (listing.rate_type === 'UNIT') return '/unit';
        }
        if (listing.listing_type === 'SUBLEASE') return '/mo';
        return '';
    }, [listing.listing_type, listing.rate_type]);

    const handleSendMessage = async () => {
        if (!currentUser) {
            alert('Please log in to send a message.');
            return;
        }

        if (isOwner) {
            alert("You can't start a conversation about your own listing.");
            return;
        }

        try {
            const conversationsRef = collection(db, 'conversations');

            const q = query(
                conversationsRef,
                where('participants', 'array-contains', currentUser.id),
            );

            const querySnapshot = await getDocs(q);

            const existingConvo = querySnapshot.docs.find(
                (doc) =>
                    doc.data().participants.includes(listing.seller.id) &&
                    doc.data().listingId === listing.listing_id,
            );

            if (existingConvo) {
                navigate(`/messages?conversationId=${existingConvo.id}`);
            } else {
                const docRef = await addDoc(conversationsRef, {
                    participants: [currentUser.id, listing.seller.id].sort(),
                    participantInfo: {
                        [currentUser.id]: {
                            name: `${currentUser.first_name} ${currentUser.last_name}`,
                        },
                        [listing.seller.id]: {
                            name: `${listing.seller.first_name} ${listing.seller.last_name}`,
                        },
                    },
                    listingId: listing.listing_id,
                    listingImage: listing.images?.[0]?.image,
                    listingPrice: listing.price,
                    listingTitle: listing.title,
                    listingSellerId: listing.seller.id,
                    lastMessage: null,
                    lastMessageAt: serverTimestamp(),
                    unreadCounts: {
                        [currentUser.id]: 0,
                        [listing.seller.id]: 0,
                    },
                });

                navigate(`/messages?conversationId=${docRef.id}`);
            }
        } catch (err) {
            console.error('Error creating or finding conversation:', err);
            alert('Could not start a conversation. Please try again.');
        }
    };

    const handleDelete = async () => {
        try {
            await deleteListing(listing.listing_id);
            setIsDeleteModalOpen(false);
            // Navigate back to profile or home after deletion
            navigate('/profile/' + listing.seller.id);
        } catch (error) {
            console.error('Failed to delete listing:', error);
            alert('Failed to delete listing. Please try again.');
        }
    };

    return (
        <>
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        {listing.title}
                    </h1>
                    <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium">
                        {listing.listing_type}
                    </span>
                </div>

                <div className="mb-6">
                    <div className="flex items-baseline">
                        <DollarSign className="w-6 h-6 text-emerald-600" />
                        <span className="text-4xl font-bold text-emerald-600">
                            {listing.price}
                            {priceUnitLabel}
                        </span>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                        Price new:{' '}
                        {listing.price_new ? `$${listing.price_new}` : 'N/A'}
                    </div>
                </div>

                <div className="border-t border-gray-200 pt-6 mb-6">
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">
                        Seller Information
                    </h3>
                    <Link to={`/profile/${listing.seller?.id}`} className="block mb-4 group">
                    {console.log(listing.seller.profile_image_url)}
                    <div className="flex items-center space-x-3 mb-3">
                        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center group-hover:bg-emerald-200">
                            {listing.seller.profile_image_url ? (
                                <img
                                    src={listing.seller.profile_image_url}
                                    alt="Profile"
                                    className="w-full h-full rounded-full object-cover"
                                />
                            ) : (
                                <p className="text-1xl font-bold text-emerald-600">
                                    {`${listing.seller.first_name?.[0] || ''}${listing.seller.last_name?.[0] || ''}`.toUpperCase()}
                                </p>
                            )}
                        </div>
                    </Link>
                </div>

                <div className="space-y-3">
                    {!isOwner && (
                        <button
                            onClick={handleSendMessage}
                            className="w-full border-2 border-emerald-600 text-emerald-600 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition flex items-center justify-center space-x-2"
                        >
                            <MessageCircle className="w-5 h-5" />
                            <span>Send Message</span>
                        </button>
                    )}

                    <div className="p-4 bg-blue-50 rounded-lg">
                        <p className="text-xs text-blue-800">
                            <strong>Safety Tip:</strong> Meet in a public place
                            on campus. Never share personal financial
                            information.
                        </p>
                    </div>

                    <div className="flex flex-row gap-3">
                        {isOwner ? (
                            <>
                                <button
                                    type="button"
                                    onClick={() =>
                                        navigate(
                                            `/listing/edit/${listing.listing_id}`,
                                        )
                                    }
                                    className="flex-1 h-12 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-800 hover:bg-emerald-200 transition-colors space-x-2"
                                >
                                    <Pen className="w-5 h-5" />
                                    <span>Edit</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsDeleteModalOpen(true)}
                                    className="flex-1 h-12 bg-red-100 rounded-lg flex items-center justify-center text-red-700 hover:bg-red-200 transition-colors space-x-2"
                                >
                                    <Trash2 className="w-5 h-5" />
                                    <span>Delete</span>
                                </button>
                            </>
                        ) : (
                            <button
                                type="button"
                                onClick={() =>
                                    navigate(
                                        `/report/listing/${listing.listing_id}`,
                                    )
                                }
                                className="flex-1 h-12 bg-red-100 rounded-lg flex items-center justify-center text-red-800 space-x-2"
                            >
                                <Flag className="w-5 h-5 text-red-600" />
                                <span>Report</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDelete}
                listingTitle={listing.title}
            />
        </>
    );
}
