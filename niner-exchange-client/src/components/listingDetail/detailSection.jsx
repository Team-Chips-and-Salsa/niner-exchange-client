import React from 'react';
import { Calendar, Package } from 'lucide-react';

export default function DetailSection({ listing, formatDate, getConditionText, getConditionColor }) {
    return(
        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">
                                Details
                            </h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center space-x-3">
                                    <Package className="w-5 h-5 text-emerald-600" />
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Condition
                                        </p>
                                        <span
                                            className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getConditionColor(listing.condition)}`}
                                        >
                                            {getConditionText(
                                                listing.condition,
                                            )}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Calendar className="w-5 h-5 text-emerald-600" />
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Posted
                                        </p>
                                        <p className="text-sm font-medium text-gray-900">
                                            {formatDate(listing.created_at)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
    )
}