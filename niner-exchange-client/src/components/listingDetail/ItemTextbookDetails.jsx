import { Package, School2 } from 'lucide-react';

export default function ItemTextbookDetails({ listing, getConditionText, getConditionColor }) {

    return (
        <>
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
            {(listing.listing_type == "TEXTBOOK") && (
                <div className="flex items-center space-x-3">
                    <School2 className="w-5 h-5 text-emerald-600" />
                    <div>
                        <p className="text-sm text-gray-500">
                            Course Code
                        </p>
                        <span className={`text-sm font-medium`}>
                            {listing.course_code}
                        </span>
                    </div>
                </div>
            )}
        </>
    )
}