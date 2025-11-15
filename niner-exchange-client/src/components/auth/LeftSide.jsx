import NinerExchangeLogo from '../../assets/logoTestNiner.png';
import idea from '../../assets/ideaaa.png';
import React from 'react';

export default function LeftSide() {
    return (
        <div className="bg-gradient-to-br from-emerald-50 to-amber-50 p-6 sm:p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-200 rounded-full opacity-20 -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-200 rounded-full opacity-20 translate-y-24 -translate-x-24"></div>

            <div className="relative z-10 max-w-xl mx-auto w-full">
                {/* Logo Section */}
                <div className="mb-8 md:mb-12">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-700 to-emerald-900 rounded-2xl flex items-center justify-center shadow-lg">
                            <img
                                src={NinerExchangeLogo}
                                alt="Niner Exchange Logo"
                                className="w-10 h-10 sm:w-14 sm:h-14 object-contain"
                            />
                        </div>
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-emerald-900">
                                Niner Exchange
                            </h1>
                            <p className="text-xs sm:text-sm text-emerald-700">
                                UNCC Community Platform
                            </p>
                        </div>
                    </div>
                </div>

                {/* Diagram Section */}
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg mb-6 md:mb-8">
                    <img src={idea} alt="Niner Exchange Logo" className="" />
                </div>
            </div>
        </div>
    );
}
