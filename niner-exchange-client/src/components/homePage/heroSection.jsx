import React from 'react';
import SearchBar from './searchBar.jsx';

export default function HeroSection() {
    return (
        <section className="bg-gradient-to-br from-emerald-700 via-emerald-600 to-emerald-500 text-white py-16 sm:py-24 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-96 h-96 bg-amber-400 rounded-full -translate-x-48 -translate-y-48"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-800 rounded-full translate-x-48 translate-y-48"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
                        Welcome to Niner Exchange
                    </h2>
                    <p className="text-xl sm:text-2xl text-emerald-100 mb-8">
                        The trusted marketplace for the UNCC community
                    </p>

                    <SearchBar />
                </div>
            </div>
        </section>
    );
}
