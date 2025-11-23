import { ChevronRight } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import ListingCard from './ListingCard';
import NoListingsCard from '../userProfile/NoListingsCard';

export default function ListingsSection({ listings, title, viewAllLink }) {
    return (
        <section className="py-8 sm:py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-2">
                            {title}
                        </h3>
                        <p className="text-gray-600">
                            Fresh opportunities from your peers -{' '}
                            {listings.length} listings
                        </p>
                    </div>
                    <Link
                        to={viewAllLink}
                        className="text-emerald-600 font-semibold flex items-center gap-1 hover:gap-2 transition-all"
                    >
                        View All <ChevronRight className="w-5 h-5" />
                    </Link>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {listings.length > 0 ? (
                        listings.map((listing) => (
                            <ListingCard
                                key={listing.listing_id}
                                listing={listing}
                            />
                        ))
                    ) : (
                        <div className="col-span-full">
                            <NoListingsCard message="No listings available in this section yet." />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
