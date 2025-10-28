import { BookOpen, Briefcase, ChevronRight, Home, Package } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const categories = [
    { id: 'all', title: 'All', icon: Package },
    { id: 'textbooks', title: 'Textbooks', icon: BookOpen },
    { id: 'sublease', title: 'Housing', icon: Home },
    { id: 'marketplace', title: 'Marketplace', icon: Package },
    { id: 'services', title: 'Services', icon: Briefcase },
];

export default function ListingsSection({ listings }) {
    const [activeCategory] = useState('all');

    return (
        <section className="py-16 sm:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-2">
                            {activeCategory === 'all'
                                ? 'All Listings'
                                : categories.find(
                                      (c) => c.id === activeCategory,
                                  )?.title}
                        </h3>
                        <p className="text-gray-600">
                            Fresh opportunities from your peers -{' '}
                            {listings.length} listings
                        </p>
                    </div>
                    <button className="text-emerald-600 font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                        View All <ChevronRight className="w-5 h-5" />
                    </button>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {listings.map((listing) => (
                        <div
                            key={listing.listing_id}
                            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden group cursor-pointer"
                        >
                            <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-48 flex items-center justify-center text-6xl group-hover:scale-105 transition-transform relative">
                                {listings.images?.[0].image ? (
                                    <img
                                        src={listing.images[0].image}
                                        alt={'listing image'}
                                        className={'w-full h-full object-cover'}
                                    />
                                ) : (
                                    <div className="text-gray-300">
                                        No Image Available
                                    </div>
                                )}
                            </div>
                            <div className="p-5">
                                <h4 className="font-bold text-gray-900 text-lg mb-1 line-clamp-1">
                                    {listing.title}
                                </h4>
                                {(listing.category === 'textbooks' ||
                                    listing.category === 'marketplace') &&
                                    listing.condition && (
                                        <p className="text-sm text-gray-500 mb-3">
                                            {listing.condition}
                                        </p>
                                    )}
                                <div className="flex items-center justify-between">
                                    <div>
                                        <span className="text-2xl font-bold text-emerald-600">
                                            ${listing.price}
                                        </span>
                                        {listing.category === 'services' && (
                                            <span className="text-sm text-gray-500">
                                                /hr
                                            </span>
                                        )}
                                        {listing.category === 'sublease' && (
                                            <span className="text-sm text-gray-500">
                                                /mo
                                            </span>
                                        )}
                                    </div>
                                    <Link to={`/listing/${listing.listing_id}`}>
                                        <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors">
                                            View
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
