import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import {
    Bell,
    MessageCircle,
    User,
    BookOpen,
    Home,
    Package,
    Briefcase,
    List,
} from 'lucide-react';
import NinerExchangeLogo from '../assets/logoTestNiner.png';

export default function PageHeader({ showListingTypes = true }) {
    const [activeListingType, setActiveListingType] = useState('all');
    const [mobileCatsOpen, setMobileCatsOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const qp = searchParams.get('category');
        if (qp) {
            setActiveListingType(qp);
        } else {
            setActiveListingType((prev) => prev || 'all');
        }
    }, [location.search, searchParams]);

    const listingTypes = [
        { id: 'ALL', title: 'All', icon: Package },
        { id: 'TEXTBOOK', title: 'Textbooks', icon: BookOpen },
        { id: 'SUBLEASE', title: 'Housing', icon: Home },
        { id: 'ITEM', title: 'Marketplace', icon: Package },
        { id: 'SERVICE', title: 'Services', icon: Briefcase },
    ];

    return (
        <header className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white sticky top-0 z-50 shadow-lg">
            <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 sm:py-4">
                <div className="flex items-center justify-between gap-3 sm:gap-6">
                    {/* Logo */}
                    <button
                        onClick={() => {
                            navigate('/home');
                        }}
                    >
                        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 min-w-0">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-800 rounded-xl flex items-center justify-center">
                                <img
                                    src={NinerExchangeLogo}
                                    alt="Niner Exchange Logo"
                                    className="w-20 h-20 sm:w-14 md:h-14 object-contain"
                                />
                            </div>
                            <div className="hidden sm:block truncate">
                                <h1 className="text-xl sm:text-2xl font-bold leading-tight truncate">
                                    Niner Exchange
                                </h1>
                                <p className="text-[10px] sm:text-xs text-emerald-100 truncate">
                                    UNCC Community Platform
                                </p>
                            </div>
                        </div>
                    </button>

                    {/* Categories Navigation - Center (desktop only) */}
                    {showListingTypes && (
                        <nav className="hidden lg:flex items-center gap-4 xl:gap-6 flex-1 justify-center">
                            {listingTypes.map((listingType) => {
                                const Icon = listingType.icon;
                                const isActive =
                                    activeListingType === listingType.id;
                                return (
                                    <button
                                        key={listingType.id}
                                        onClick={() => {
                                            setActiveListingType(
                                                listingType.id,
                                            );
                                            navigate(
                                                `/search?listing_type=${encodeURIComponent(
                                                    listingType.id,
                                                )}`,
                                            );
                                        }}
                                        className={`flex flex-col items-center gap-0.5 pb-1 px-2 xl:px-3 border-b-2 transition-all ${
                                            isActive
                                                ? 'border-amber-400 text-white'
                                                : 'border-transparent text-emerald-100 hover:text-white hover:border-emerald-400'
                                        }`}
                                    >
                                        <Icon className="w-4 h-4 xl:w-5 xl:h-5" />
                                        <span className="text-[10px] xl:text-xs font-medium whitespace-nowrap">
                                            {listingType.title}
                                        </span>
                                    </button>
                                );
                            })}
                        </nav>
                    )}

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
                        {showListingTypes && (
                            <button
                                type="button"
                                className="lg:hidden p-2 hover:bg-emerald-700 rounded-lg transition-colors"
                                aria-label="Browse categories"
                                aria-expanded={mobileCatsOpen}
                                aria-controls="mobile-categories"
                                onClick={() => setMobileCatsOpen((v) => !v)}
                            >
                                <List className="w-5 h-5" />
                            </button>
                        )}
                        <button
                            onClick={() => {
                                navigate('/create');
                            }}
                            className="hidden md:inline-flex items-center gap-2 bg-amber-400 text-emerald-900 px-3 sm:px-4 py-2 rounded-lg font-bold hover:bg-amber-500 transition-all shadow-lg whitespace-nowrap"
                        >
                            Post Listing
                        </button>
                        <button
                            className="p-2 hover:bg-emerald-700 rounded-lg transition-colors relative"
                            aria-label="Notifications"
                        >
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>
                        <button
                            className="p-2 hover:bg-emerald-700 rounded-lg transition-colors"
                            aria-label="Messages"
                            onClick={() =>
                                navigate('/messages', {
                                    state: { focusList: true },
                                })
                            }
                        >
                            <MessageCircle className="w-5 h-5" />
                        </button>
                        <button
                            className="p-2 hover:bg-emerald-700 rounded-full transition-colors"
                            aria-label="Profile"
                        >
                            <User className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Mobile Categories (collapsible) */}
                {showListingTypes && (
                    <div
                        id="mobile-categories"
                        className={`lg:hidden ${mobileCatsOpen ? 'block' : 'hidden'} mt-3`}
                    >
                        <div className="flex flex-wrap items-center justify-center gap-3 pb-1 px-2">
                            {listingTypes.map((listingType) => {
                                const Icon = listingType.icon;
                                const isActive =
                                    activeListingType === listingType.id;
                                return (
                                    <button
                                        key={listingType.id}
                                        onClick={() => {
                                            setActiveListingType(
                                                listingType.id,
                                            );
                                            setMobileCatsOpen(false);
                                            navigate(
                                                `/search?listing_type=${encodeURIComponent(
                                                    listingType.id,
                                                )}`,
                                            );
                                        }}
                                        className={`flex flex-col items-center gap-0.5 pb-1 px-2 border-b-2 transition-all flex-shrink-0 ${
                                            isActive
                                                ? 'border-amber-400 text-white'
                                                : 'border-transparent text-emerald-100 hover:text-white'
                                        }`}
                                    >
                                        <Icon className="w-4 h-4" />
                                        <span className="text-[10px] font-medium whitespace-nowrap">
                                            {listingType.title}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
