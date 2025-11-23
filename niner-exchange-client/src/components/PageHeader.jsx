import React, { useState, useEffect, useRef } from 'react';
import {
    useNavigate,
    useLocation,
    useSearchParams,
    Link,
} from 'react-router-dom';
import {
    Bell,
    MessageCircle,
    User,
    BookOpen,
    Home,
    Package,
    Briefcase,
    List,
    LogOut,
} from 'lucide-react';
import NinerExchangeLogo from '../assets/logoTestNiner.png';
import { useAuth } from '../context/AuthContext.jsx';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase.js';

export default function PageHeader({
    showListingTypes = true,
    notifications,
    unreadNotifCount,
    totalUnreadMessages,
}) {
    const [activeListingType, setActiveListingType] = useState('ALL');
    const [mobileCatsOpen, setMobileCatsOpen] = useState(false);

    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [isNotifMenuOpen, setIsNotifMenuOpen] = useState(false);
    const { currentUser, logout } = useAuth();
    const profileMenuRef = useRef(null);
    const notifMenuRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        if (location.pathname === '/search') {
            const qp = searchParams.get('listing_type');
            setActiveListingType(qp || 'ALL');
        } else {
            setActiveListingType(null);
        }
    }, [location.pathname, location.search, searchParams]);

    const listingTypes = [
        { id: 'ALL', title: 'All', icon: Package },
        { id: 'TEXTBOOK', title: 'Textbooks', icon: BookOpen },
        { id: 'SUBLEASE', title: 'Housing', icon: Home },
        { id: 'ITEM', title: 'Marketplace', icon: Package },
        { id: 'SERVICE', title: 'Services', icon: Briefcase },
    ];

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                profileMenuRef.current &&
                !profileMenuRef.current.contains(event.target)
            ) {
                setIsProfileMenuOpen(false);
            }
            if (
                notifMenuRef.current &&
                !notifMenuRef.current.contains(event.target)
            ) {
                setIsNotifMenuOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleBellClick = () => {
        setIsNotifMenuOpen((prev) => !prev);
        if (!isNotifMenuOpen && unreadNotifCount > 0) {
            notifications.forEach((notif) => {
                if (!notif.is_read) {
                    const notifRef = doc(db, 'notifications', notif.id);
                    updateDoc(notifRef, { is_read: true });
                }
            });
        }
    };

    const handleNotifClick = (notif) => {
        if (!notif.is_read) {
            const notifRef = doc(db, 'notifications', notif.id);
            updateDoc(notifRef, { is_read: true });
        }
        setIsNotifMenuOpen(false);
        navigate(notif.link_to);
    };

    return (
        <header className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white sticky top-0 z-50 shadow-lg">
            <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 sm:py-4">
                <div className="flex items-center justify-between gap-3 sm:gap-6">
                    <Link to="/home" className="block">
                        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 min-w-0">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-800 rounded-xl flex items-center justify-center overflow-hidden">
                                <img
                                    src={NinerExchangeLogo}
                                    alt="Niner Exchange Logo"
                                    className="w-full h-full object-cover"
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
                    </Link>

                    {showListingTypes && (
                        <nav className="hidden lg:flex items-center gap-4 xl:gap-6 flex-1 justify-center">
                            {listingTypes.map((listingType) => {
                                const Icon = listingType.icon;
                                const isActive =
                                    activeListingType === listingType.id;
                                const linkTo =
                                    listingType.id === 'ALL'
                                        ? '/search'
                                        : `/search?listing_type=${encodeURIComponent(listingType.id)}`;
                                return (
                                    <Link
                                        key={listingType.id}
                                        to={linkTo}
                                        onClick={() => {
                                            setActiveListingType(
                                                listingType.id,
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
                                    </Link>
                                );
                            })}
                        </nav>
                    )}

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
                        <Link
                            to="/create"
                            className="hidden md:inline-flex items-center gap-2 bg-amber-400 text-emerald-900 px-3 sm:px-4 py-2 rounded-lg font-bold hover:bg-amber-500 transition-all shadow-lg whitespace-nowrap"
                        >
                            Post Listing
                        </Link>
                        <div className="relative" ref={notifMenuRef}>
                            <button
                                onClick={handleBellClick}
                                className="p-2 hover:bg-emerald-700 rounded-lg transition-colors relative"
                                aria-label="Notifications"
                            >
                                <Bell className="w-5 h-5" />
                                {unreadNotifCount > 0 && (
                                    <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center font-bold">
                                        {unreadNotifCount}
                                    </span>
                                )}
                            </button>

                            {isNotifMenuOpen && (
                                <div className="fixed left-4 right-4 top-16 sm:absolute sm:right-0 sm:top-12 sm:w-80 sm:left-auto bg-white rounded-lg shadow-xl z-50 text-gray-800 border border-gray-200">
                                    <div className="p-3 border-b">
                                        <h3 className="font-semibold">
                                            Notifications
                                        </h3>
                                    </div>
                                    <div className="py-1 max-h-96 overflow-y-auto">
                                        {notifications.length > 0 ? (
                                            notifications.map((notif) => (
                                                <button
                                                    key={notif.id}
                                                    onClick={() =>
                                                        handleNotifClick(notif)
                                                    }
                                                    className={`block w-full text-left px-4 py-3 hover:bg-gray-100 ${
                                                        !notif.is_read
                                                            ? 'font-bold'
                                                            : 'font-normal'
                                                    }`}
                                                >
                                                    <p className="text-sm">
                                                        {notif.message}
                                                    </p>
                                                </button>
                                            ))
                                        ) : (
                                            <p className="p-4 text-sm text-gray-500">
                                                You have no new notifications.
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                        <Link
                            to="/messages"
                            state={{ focusList: true }}
                            className="p-2 hover:bg-emerald-700 rounded-lg transition-colors relative block"
                            aria-label="Messages"
                        >
                            <MessageCircle className="w-5 h-5" />
                            {totalUnreadMessages > 0 && (
                                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center font-bold">
                                    {totalUnreadMessages}
                                </span>
                            )}
                        </Link>
                        <div className="relative" ref={profileMenuRef}>
                            <button
                                onClick={() =>
                                    setIsProfileMenuOpen((prev) => !prev)
                                }
                                className="p-2 hover:bg-emerald-700 rounded-full transition-colors"
                                aria-label="Profile menu"
                            >
                                {currentUser?.profile_image_url ? (
                                    <img
                                        src={currentUser.profile_image_url}
                                        alt="Profile"
                                        className="w-5 h-5 rounded-full object-cover"
                                    />
                                ) : (
                                    <User className="w-5 h-5" />
                                )}
                            </button>

                            {isProfileMenuOpen && (
                                <div className="absolute right-0 top-12 w-56 bg-white rounded-lg shadow-xl py-2 z-50 text-gray-800 border border-gray-200">
                                    <div className="px-4 py-2 border-b border-gray-100">
                                        <p className="text-sm font-semibold truncate">
                                            {currentUser?.first_name}{' '}
                                            {currentUser?.last_name}
                                        </p>
                                        <p className="text-xs text-gray-500 truncate">
                                            {currentUser?.email}
                                        </p>
                                    </div>

                                    <div className="py-1">
                                        <Link
                                            to={`/profile/${currentUser?.id}`}
                                            onClick={() =>
                                                setIsProfileMenuOpen(false)
                                            }
                                            className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
                                        >
                                            <User className="w-4 h-4 text-gray-600" />
                                            <span>My Profile</span>
                                        </Link>

                                        {currentUser?.role === 'admin' && (
                                            <Link
                                                to="/admin"
                                                onClick={() =>
                                                    setIsProfileMenuOpen(false)
                                                }
                                                className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
                                            >
                                                <Briefcase className="w-4 h-4 text-gray-600" />
                                                <span>Dashboard</span>
                                            </Link>
                                        )}

                                        <button
                                            onClick={() => {
                                                logout();
                                                setIsProfileMenuOpen(false);
                                            }}
                                            className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left transition-colors"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

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
                                const linkTo =
                                    listingType.id === 'ALL'
                                        ? '/search'
                                        : `/search?listing_type=${encodeURIComponent(listingType.id)}`;
                                return (
                                    <Link
                                        key={listingType.id}
                                        to={linkTo}
                                        onClick={() => {
                                            setActiveListingType(
                                                listingType.id,
                                            );
                                            setMobileCatsOpen(false);
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
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
