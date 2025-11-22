import React from 'react';
import NinerExchangeLogo from '../../assets/logoTestNiner.png';

// Mobile-only header replicating LeftSide branding
export default function MobileHeader() {
    return (
        <div className="block md:hidden mb-6">
            <div className="relative bg-gradient-to-br from-emerald-50 to-amber-50 rounded-2xl p-5 overflow-hidden shadow-md">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-200 rounded-full opacity-30 -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-200 rounded-full opacity-30 translate-y-12 -translate-x-12"></div>

                {/* Logo Section */}
                <div className="relative flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-700 to-emerald-900 rounded-2xl flex items-center justify-center shadow-lg">
                        <img
                            src={NinerExchangeLogo}
                            alt="Niner Exchange Logo"
                            className="w-10 h-10 object-contain"
                        />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-emerald-900">
                            Niner Exchange
                        </h1>
                        <p className="text-xs text-emerald-700">
                            UNC Charlotte Community Platform
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

