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
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    useEffect(() => {
        // Normalize images to an array of URL strings.
        const normalized = (listing?.images || []).map((item) => {
            if (!item) return null;
            return typeof item === 'string' ? item : item.image || item.url || null;
        }).filter(Boolean);
        setImages(normalized);
        setSelectedImageIndex(0);
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
                            images={images}
                            selectedImage={selectedImageIndex}
                            setSelectedImage={setSelectedImageIndex}
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
