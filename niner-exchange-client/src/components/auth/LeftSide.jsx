import React, { useState, useEffect } from 'react';
import { Home, BookOpen, Package, Briefcase } from 'lucide-react';
import NinerExchangeLogo from '../../assets/logoTestNiner.png';

const features = [
    {
        icon: Home,
        title: 'Find Your Next Sublease',
        testimonial:
            '“I found a great place for the spring semester in just two days. So much easier than Facebook!”',
        author: '— Pablo G.',
    },
    {
        icon: BookOpen,
        title: 'Buy & Sell Textbooks',
        testimonial:
            '“Sold all my old textbooks and made $150. I saved another $200 buying my new ones here.”',
        author: '— Sean K.',
    },
    {
        icon: Package,
        title: 'Discover Marketplace Items',
        testimonial:
            '“Grabbed a barely-used mini-fridge for my dorm for half the price of a new one. A total steal!”',
        author: '— Nick T.',
    },
    {
        icon: Briefcase,
        title: 'Offer & Find Services',
        testimonial:
            '“I offer tutoring services and got 5 new clients in the first week. It’s the perfect side hustle.”',
        author: '— Raghav P.',
    },
];

export default function LeftSide() {
    const [currentFeature, setCurrentFeature] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentFeature((prev) => (prev + 1) % features.length);
        }, 5000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="bg-gradient-to-br from-emerald-50 to-amber-50 p-6 sm:p-8 md:p-12 flex flex-col justify-start relative overflow-hidden min-h-full">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-200 rounded-full opacity-20 -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-200 rounded-full opacity-20 translate-y-24 -translate-x-24"></div>

            <div className="relative z-10 max-w-lg mx-auto w-full">
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
                                UNC Charlotte Community Platform
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Carousel */}
            <div className="relative z-10 max-w-lg mx-auto w-full flex-grow flex items-center">
                <div className="bg-white rounded-2xl shadow-lg text-center overflow-hidden w-full">
                    <div className="relative min-h-[320px] sm:min-h-[350px] flex items-center justify-center p-6 sm:p-10">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <div
                                    key={index}
                                    className={`absolute inset-0 p-6 sm:p-10 flex flex-col justify-center items-center transition-opacity duration-700 ease-in-out
                                        ${
                                            currentFeature === index
                                                ? 'opacity-100'
                                                : 'opacity-0'
                                        }
                                    `}
                                >
                                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-emerald-100 to-emerald-200 text-emerald-700 rounded-full flex items-center justify-center mb-4">
                                        <Icon className="w-8 h-8 sm:w-10 sm:h-10" />
                                    </div>
                                    <h2 className="text-xl sm:text-2xl font-bold text-emerald-900 mb-2">
                                        {feature.title}
                                    </h2>
                                    <p className="text-sm sm:text-base text-gray-600 font-medium italic mb-4">
                                        {feature.testimonial}
                                    </p>
                                    <p className="text-xs sm:text-sm font-semibold text-emerald-800">
                                        {feature.author}
                                    </p>
                                </div>
                            );
                        })}
                    </div>

                    {/* Navigation Dots */}
                    <div className="flex justify-center gap-2 pb-6">
                        {features.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentFeature(index)}
                                className={`w-2.5 h-2.5 rounded-full transition-all duration-300
                                    ${
                                        currentFeature === index
                                            ? 'bg-emerald-700 scale-110'
                                            : 'bg-gray-300 hover:bg-gray-400'
                                    }
                                `}
                                aria-label={`Go to feature ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
