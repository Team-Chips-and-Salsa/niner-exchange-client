import React from 'react';

export default function ListingImageGallery({ images = [], selectedImage = 0, setSelectedImage = () => {} }) {
    const placeholderStyle = 'aspect-video bg-gray-100 flex items-center justify-center text-gray-400 text-sm';

    if (!images || images.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className={placeholderStyle}>No Image Available</div>
            </div>
        );
    }

    const mainSrc = images[selectedImage] || images[0];

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Main Image */}
            <div className="aspect-video bg-gray-100 flex items-center justify-center">
                <img
                    src={mainSrc}
                    alt={`Listing image ${selectedImage + 1}`}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Thumbnail Images */}
            {images.length > 1 && (
                <div className="p-4 flex space-x-2 overflow-x-auto">
                    {images.map((src, idx) => (
                        <button
                            key={src || idx}
                            onClick={() => setSelectedImage(idx)}
                            className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                                selectedImage === idx ? 'border-emerald-600' : 'border-gray-200'
                            }`}
                        >
                            <img src={src} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}