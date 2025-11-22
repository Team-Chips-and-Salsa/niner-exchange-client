import React, { useState, useMemo } from 'react';
import { DollarSign, User, MessageCircle, Pen, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DeleteConfirmationModal from './deleteConfirmationModal'; 
import { deleteListing } from '../../services/listingApi';

export default function PriceCard({ listing, formatDate, isOwner }) {
    const navigate = useNavigate();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const priceUnitLabel = useMemo(() => {
        if (listing.listing_type === 'SERVICE') {
            if (listing.rate_type === 'HOURLY') return "/hr";
            else if (listing.rate_type === 'PERSON') return "/person";
            else if (listing.rate_type === 'GROUP') return "/group";
            else if (listing.rate_type === 'UNIT') return "/unit";
        }
        if (listing.listing_type === 'SUBLEASE') return '/mo';
        return '';
    }, [listing.listing_type, listing.rate_type]);

    const handleDelete = async () => {
        await deleteListing(listing.listing_id);
        setIsDeleteModalOpen(false);
        // Navigate back to profile or home after deletion
        navigate('/profile/' + listing.seller.id);
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
                            {listing.price}{priceUnitLabel}
                        </span>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                        Price new: {listing.price_new ? `$${listing.price_new}` : 'N/A'}
                    </div>
                </div>

                <div className="border-t border-gray-200 pt-6 mb-6">
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">
                        Seller Information
                    </h3>
                    <div className="flex items-center space-x-3 mb-3">
                        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div>
                            <p className="font-medium text-gray-900">
                                {`${listing.seller.first_name} ${listing.seller.last_name}`}
                            </p>
                            <p className="text-sm text-gray-500">{listing.seller.email}</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    <button className="w-full border-2 border-emerald-600 text-emerald-600 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition flex items-center justify-center space-x-2">
                        <MessageCircle className="w-5 h-5" />
                        <span>Send Message</span>
                    </button>
                    
                    <div className="p-4 bg-blue-50 rounded-lg">
                        <p className="text-xs text-blue-800">
                            <strong>Safety Tip:</strong> Meet in a public place on
                            campus. Never share personal financial information.
                        </p>
                    </div>

                    {/* Owner Actions - Only show if user owns this listing */}
                    {isOwner && (
                        <div className="flex gap-2 pt-2">
                            <button 
                                type="button" 
                                onClick={() => navigate(`/listing/edit/${listing.listing_id}`)} 
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
                        </div>
                    )}
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDelete}
                listingTitle={listing.title}
            />
        </>
    );
}