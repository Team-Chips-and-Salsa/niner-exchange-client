import React, { useEffect, useState } from 'react';
import { fetchListings } from '../services/listingApi.js';
import HeroSection from '../components/homePage/heroSection.jsx';
import ListingsSection from '../components/homePage/ListingsSection.jsx';

/*Used AI to help generate the tailwind css based off our team's figma design*/
export default function HomePage() {
    const [listings, setListings] = useState([]);

    useEffect(() => {
        fetchListings().then((data) => {
            setListings(data);
        });
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <HeroSection />

            <ListingsSection listings={listings} />

            {/* Mobile Post Button */}
            <button className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-500 text-emerald-900 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-40 font-bold text-2xl">
                +
            </button>
        </div>
    );
}
