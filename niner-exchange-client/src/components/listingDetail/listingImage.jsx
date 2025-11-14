import React, { useState } from 'react';


export default function ListingImageGallery({ listing}) {
    const [selectedIndex, setSelectedIndex] = useState(0)

    if (!listing || !listing.images) {
        return null; // Or a loading spinner or fallback UI
    }
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            {/* Main Image */}
                            <div className="aspect-video bg-gray-100 flex items-center justify-center">
                                <img
                                    src={listing.images[selectedIndex].image}
                                    alt={listing.title}
                                    className="w-full h-full object-contain"
                                />
                            </div>

                            {/* Thumbnail Images */}
                            {listing.images.length > 1 && (
                                <div className="p-4 flex space-x-2 overflow-x-auto">
                                    {listing.images.map((img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() =>
                                                setSelectedIndex(idx)
                                            }
                                            className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                                                selectedIndex === idx
                                                    ? 'border-emerald-600'
                                                    : 'border-gray-200'
                                            }`}
                                        >
                                            <img
                                                src={img.image}
                                                alt={`Thumbnail ${idx + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
    );
}