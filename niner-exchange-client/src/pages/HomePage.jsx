import React, { useEffect, useState } from 'react';
import { fetchListings } from '../services/listingApi.js';
import HeroSection from '../components/homePage/heroSection.jsx';
import ListingsSection from '../components/homePage/ListingsSection.jsx';
import { useNavigate } from 'react-router-dom';

/*Used AI to help generate the tailwind css based off our team's figma design*/
export default function HomePage() {
    const [listings, setListings] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchListings({ status: 'ACTIVE' }).then((data) => {
            setListings(data);
        });
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <HeroSection />

            {/* All Listings */}
            <ListingsSection
                title="All Listings"
                listings={listings.slice(0, 4)}
                viewAllLink="/search"
            />

            {/* Textbooks */}
            <ListingsSection
                title="Textbooks"
                listings={listings
                    .filter((l) => l.listing_type === 'TEXTBOOK')
                    .slice(0, 4)}
                viewAllLink="/search?listing_type=TEXTBOOK"
            />

            {/* Housing */}
            <ListingsSection
                title="Housing"
                listings={listings
                    .filter((l) => l.listing_type === 'SUBLEASE')
                    .slice(0, 4)}
                viewAllLink="/search?listing_type=SUBLEASE"
            />

            {/* Marketplace */}
            <ListingsSection
                title="Marketplace"
                listings={listings
                    .filter((l) => l.listing_type === 'ITEM')
                    .slice(0, 4)}
                viewAllLink="/search?listing_type=ITEM"
            />

            {/* Services */}
            <ListingsSection
                title="Services"
                listings={listings
                    .filter((l) => l.listing_type === 'SERVICE')
                    .slice(0, 4)}
                viewAllLink="/search?listing_type=SERVICE"
            />

            <button
                onClick={() => {
                    navigate('/create');
                }}
                className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-500 text-emerald-900 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-40 font-bold text-2xl"
            >
                +
            </button>
        </div>
    );
}
