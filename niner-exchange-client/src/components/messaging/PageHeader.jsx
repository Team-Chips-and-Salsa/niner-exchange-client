import React from 'react';
import NinerExchangeLogo from '../../assets/logoTestNiner.png';

export default function PageHeader() {
    return (
        <header className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-4 sm:px-6 py-4 shadow-lg">
            <div className="w-full flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-800 rounded-xl flex items-center justify-center">
                        <img
                            src={NinerExchangeLogo}
                            alt="Niner Exchange Logo"
                            className="w-20 h-20 sm:w-14 md:h-14 object-contain"
                        />
                    </div>
                    <h1 className="text-xl sm:text-2xl font-bold">
                        Niner Exchange
                    </h1>
                </div>
                <div className="flex items-center gap-4">
                    <button className="px-4 py-2 text-sm font-medium hover:bg-emerald-700 rounded-lg transition-colors hidden sm:block">
                        Dashboard
                    </button>
                    <button className="px-4 py-2 text-sm font-medium hover:bg-emerald-700 rounded-lg transition-colors hidden sm:block">
                        Profile
                    </button>
                </div>
            </div>
        </header>
    );
}
