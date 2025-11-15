import React from 'react';
import { useMemo } from 'react';
import { DollarSign, User, MessageCircle, Pen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


export default function PriceCard({ listing, formatDate }) {
    const navigate = useNavigate();

    const priceUnitLabel = useMemo(() => {
        if (listing.listing_type === 'SERVICE') {
            if (listing.rate_type === 'HOURLY') {
                return "/hr";
            }
            else if (listing.rate_type === 'PERSON') {
                return "/person"
            }
            else if (listing.rate_type === 'GROUP') {
                return "/group"
            }
            else if (listing.rate_type === 'UNIT') {
                return "/unit"
            }
        }
        if (listing.listing_type === 'SUBLEASE') return '/mo';
    }, [listing.listing_type]);

    return (
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
                            {listing.seller}
                        </p>
                        <p className="text-sm text-gray-500">{listing.seller}</p>
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
                <button type='button' onClick={() => navigate(`/listing/edit/${listing.listing_id}`)} className="w-1/3 h-12 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-800 space-x-2">
                    <Pen className="w-6 h-6 text-emerald-600" />
                    <span>Edit</span>
                </button>
            </div>
        </div>
    );
}
