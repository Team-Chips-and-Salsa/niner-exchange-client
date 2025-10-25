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

const CATEGORIES = [
    { id: 'all', title: 'All', icon: Package },
    { id: 'textbooks', title: 'Textbooks', icon: BookOpen },
    { id: 'sublease', title: 'Housing', icon: Home },
    { id: 'marketplace', title: 'Marketplace', icon: Package },
    { id: 'services', title: 'Services', icon: Briefcase },
];

const CATEGORIES_WITH_CONDITION = new Set(['textbooks', 'marketplace']);

export default function CreateListingPage({ initialCategory = 'textbooks' }) {
    const [selectedCategory, setSelectedCategory] = useState(
        initialCategory || 'all',
    );
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [condition, setCondition] = useState('');

    const priceUnitLabel = useMemo(() => {
        if (selectedCategory === 'services') return '/hr';
        if (selectedCategory === 'sublease') return '/mo';
        return '$';
    }, [selectedCategory]);

    const showCondition = CATEGORIES_WITH_CONDITION.has(selectedCategory);

    function handleIconClick(catId) {
        setSelectedCategory(catId);
        if (!CATEGORIES_WITH_CONDITION.has(catId)) setCondition('');
    }

    return (
        <div className="min-h-[60vh] bg-gradient-to-b from-gray-50 to-white">
            {/* Page content goes here; header/footer provided by layout */}
        </div>
    );
}
