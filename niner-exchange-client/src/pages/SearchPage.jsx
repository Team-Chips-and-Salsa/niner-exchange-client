import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
    Search,
    BookOpen,
    Home,
    Package,
    Briefcase,
    Shield,
    Star,
    MessageCircle,
    ChevronRight,
    Crown,
    Bell,
    User,
    Award,
    CheckCircle,
} from 'lucide-react';
import PageHeader from '../components/messaging/PageHeader.jsx';
import Footer from '../components/Footer.jsx';
import FilterSidebar from '../components/filterSidebar/FilterSidebar.jsx';

export default function SearchPage() {
    const [searchParams] = useSearchParams();
    const urlCategory = searchParams.get('category') || 'all';

    const [isDesktop, setIsDesktop] = useState(() => {
        if (typeof window === 'undefined') return true;
        return window.innerWidth >= 768;
    });

    useEffect(() => {
        function handleResize() {
            if (typeof window === 'undefined') return;
            setIsDesktop(window.innerWidth >= 768);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const recentListings = [
        {
            id: 1,
            title: 'Calculus III Textbook',
            price: 45,
            category: 'textbooks',
            image: '📚',
            condition: 'Like New',
        },
        {
            id: 2,
            title: 'Gaming Chair',
            price: 120,
            category: 'marketplace',
            image: '🪑',
            condition: 'Like New',
        },
        {
            id: 3,
            title: 'Studio Apartment Summer',
            price: 550,
            category: 'sublease',
            image: '🏘️',
            condition: 'Available',
        },
        {
            id: 4,
            title: 'Spanish Tutoring',
            price: 20,
            category: 'services',
            image: '🗣️',
            condition: 'per hour',
        },
    ];

    const filteredListings = useMemo(() => {
        if (!urlCategory || urlCategory === 'all') return recentListings;
        return recentListings.filter(
            (l) => String(l.category) === String(urlCategory),
        );
    }, [recentListings, urlCategory]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Header */}
            <PageHeader showCategories={true} />
            <FilterSidebar/>
            {/* Footer */}
            <Footer />
        </div>
    );
}
