import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    MessageCircle,
    User,
    Calendar,
    Package,
    DollarSign,
    ArrowLeft,
} from 'lucide-react';
import PriceCard from '../components/listingDetail/priceCard';
import ListingImageGallery from '../components/listingDetail/listingImage';
import DescriptionSection from '../components/listingDetail/descriptionSection';
import DetailSection from '../components/listingDetail/detailSection';
import { fetchListingById } from '../services/listingApi';

const ListingDetailPage = () => {
    // Sample listing data - this would come from your Django API

    /*
    const [listing] = useState({
        listing_id: '123e4567-e89b-12d3-a456-426614174000',
        title: 'Calculus III Textbook',
        description:
            'Excellent condition calculus textbook. Used for one semester. All pages intact, minimal highlighting. Perfect for MATH 2241 students.',
        price: '45.00',
        condition: 'LIKE_NEW',
        status: 'ACTIVE',
        category: { name: 'Textbooks', icon: '📚' },
        seller: {
            name: 'Sarah Johnson',
            email: 'sjohnson@uncc.edu',
            joined: '2024-01-15',
        },
        created_at: '2025-10-20T10:30:00Z',
        updated_at: '2025-10-20T10:30:00Z',
        images: [
            'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&h=600&fit=crop',
        ],
    });
    */

    const [listing, setListing] = useState();
    const { id } = useParams();

    useEffect(() => {
        console.log("Effect running with id:", id);
        if (id) {
            fetchListingById(id)
                .then((data) => {
                    console.log("Data received in component:", data);
                    setListing(data);
                })
                .catch((err) => console.error("Fetch error:", err));
        } else {
            console.warn("No id found in route params!");
        }
    }, [id]);

    const [images, setImages] = useState([]);
    useEffect(() => {
        setImages(listing?.images || []);
    }, [listing]);

    // Loading guard: only render children when listing is loaded
    if (!listing) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-lg text-gray-500">Loading listing...</div>
            </div>
        );
    }

    const getConditionColor = (condition) => {
        switch (condition) {
            case 'NEW':
                return 'bg-green-100 text-green-800';
            case 'LIKE_NEW':
                return 'bg-blue-100 text-blue-800';
            case 'USED':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getConditionText = (condition) => {
        switch (condition) {
            case 'NEW':
                return 'New';
            case 'LIKE_NEW':
                return 'Like New';
            case 'USED':
                return 'Used';
            default:
                return condition;
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Images */}
                    <div className="lg:col-span-2">
                        <ListingImageGallery
                            listing={listing}
                        />
                        {console.log('Listing Images:', listing)}
                        {/* Mobile Price Card - Only visible on mobile */}
                        <div className="lg:hidden mt-6">
                            <PriceCard
                                listing={listing}
                                formatDate={formatDate}
                            />
                        </div>

                        {/* Description */}
                        <DescriptionSection listing={listing} />

                        {/* Details */}
                        <DetailSection
                            listing={listing}
                            formatDate={formatDate}
                            getConditionText={getConditionText}
                            getConditionColor={getConditionColor}
                        />
                    </div>

                    {/* Right Column - Sidebar - Hidden on mobile, sticky on desktop */}
                    <div className="hidden lg:block lg:col-span-1">
                        <div>
                            <PriceCard
                                listing={listing}
                                formatDate={formatDate}
                            />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ListingDetailPage;
