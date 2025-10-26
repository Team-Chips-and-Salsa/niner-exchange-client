import React from 'react';
import { DollarSign, User, MessageCircle } from 'lucide-react';


export default function PriceCard({ listing, formatDate }) {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    {listing.title}
                </h1>
                <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium">
                    {listing.category.name}
                </span>
            </div>

            <div className="mb-6">
                <div className="flex items-baseline">
                    <DollarSign className="w-6 h-6 text-emerald-600" />
                    <span className="text-4xl font-bold text-emerald-600">
                        {listing.price}
                    </span>
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
                            {listing.seller.name}
                        </p>
                        <p className="text-sm text-gray-500">UNCC Student</p>
                    </div>
                </div>
                <p className="text-xs text-gray-500">
                    Member since {formatDate(listing.seller.joined)}
                </p>
            </div>

            <div className="space-y-3">
                <button className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition">
                    Contact Seller
                </button>
                <button className="w-full border-2 border-emerald-600 text-emerald-600 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition flex items-center justify-center space-x-2">
                    <MessageCircle className="w-5 h-5" />
                    <span>Send Message</span>
                </button>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-xs text-blue-800">
                    <strong>Safety Tip:</strong> Meet in a public place on
                    campus. Never share personal financial information.
                </p>
            </div>
        </div>
    );
}
