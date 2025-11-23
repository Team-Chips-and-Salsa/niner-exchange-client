import React from 'react';
import { Flag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function TransactionInfo({ reviewee, transaction }) {
    const navigate = useNavigate();

    const handleReport = () => {
        if (reviewee?.id) {
            navigate(`/report/customuser/${reviewee.id}`);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 relative">
            <button
                onClick={handleReport}
                className="absolute top-6 right-6 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
                title="Report User"
            >
                <Flag className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold text-gray-900 mb-4 pr-12">
                Your Transaction with {reviewee.first_name}
            </h2>
            <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-full flex items-center justify-center text-emerald-700 font-bold text-xl flex-shrink-0">
                    {reviewee.first_name[0]}
                    {reviewee.last_name[0]}
                </div>
                <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-lg">
                        {reviewee.first_name} {reviewee.last_name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">
                        {reviewee.email}
                    </p>
                    <div className="bg-gray-50 rounded-lg p-3 mt-3">
                        <p className="text-sm text-gray-600 mb-1">Item</p>
                        <p className="font-semibold text-gray-900">
                            {transaction.listing.title}
                        </p>
                        <p className="text-emerald-600 font-bold mt-1">
                            ${transaction.final_price}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
