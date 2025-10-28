import React from 'react';

export default function DescriptionSection({ listing }) {
    return(
        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">
                                Description
                            </h2>
                            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                                {listing.description}
                            </p>
                        </div>
    )
}