import React from 'react';
import { PackageOpen } from 'lucide-react';

const NoListingsCard = ({ message }) => {
    return (
        <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl border-2 border-dashed border-gray-200 text-center hover:border-gray-300 transition-colors">
            <div className="bg-gray-50 p-4 rounded-full mb-4">
                <PackageOpen className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">
                No listings found
            </h3>
            <p className="text-gray-500">{message}</p>
        </div>
    );
};

export default NoListingsCard;
