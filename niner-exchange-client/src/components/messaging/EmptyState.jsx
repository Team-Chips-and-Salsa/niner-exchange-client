import React from 'react';
import NinerExchangeLogo from '../../assets/logoTestNiner.png';

export default function EmptyState() {
    return (
        <div className="hidden md:flex flex-1 items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <img
                        src={NinerExchangeLogo}
                        alt="Niner Exchange Logo"
                        className="w-20 h-20 sm:w-14 md:h-14 object-contain"
                    />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Welcome to Messages
                </h3>
                <p className="text-gray-600">
                    Select a conversation to start messaging
                </p>
            </div>
        </div>
    );
}
