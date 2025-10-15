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

export default function CreateListingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Header */}
            <PageHeader showCategories={true} />

            {/* Hero Section */}

            {/* Footer */}
            <Footer />
        </div>
    );
}
