import { House, PersonStanding, Bed, CarFront, Building, Building2, Hourglass, ClockFading, ClockAlert } from 'lucide-react';

export default function SubleaseDetails({ listing, formatDate }) {

    const getPropertyText = (property_type) => {
        switch (property_type) {
            case 'APARTMENT':
                return 'Apartment';
            case 'HOUSE':
                return 'House';
            default:
                return property_type;
        }
    };

    return (
        <>
            <div className="flex items-center space-x-3">
                <ClockAlert className="w-5 h-5 text-emerald-600" />
                <div>
                    <p className="text-sm text-gray-500">
                        Lease Starts
                    </p>
                    <span
                        className={`text-sm font-medium`}
                    >
                        {formatDate(listing.start_date)}
                    </span>
                </div>
            </div>
            <div className="flex items-center space-x-3">
                <ClockFading className="w-5 h-5 text-emerald-600" />
                <div>
                    <p className="text-sm text-gray-500">
                        Lease Ends
                    </p>
                    <span
                        className={`text-sm font-medium`}
                    >
                        {formatDate(listing.end_date)}
                    </span>
                </div>
            </div>
            <div className="flex items-center space-x-3">
                {(listing.property_type == "APARTMENT") ? (
                    <Building className="w-5 h-5 text-emerald-600" />
                ) : (
                    <House className="w-5 h-5 text-emerald-600" />
                )}
                <div>
                    <p className="text-sm text-gray-500">
                        Property Type
                    </p>
                    <span
                        className={`text-sm font-medium`}
                    >
                        {getPropertyText(listing.property_type)}
                    </span>
                </div>
            </div>
            <div className="flex items-center space-x-3">
                {(listing.property_type == "APARTMENT") ? (
                    <Building className="w-5 h-5 text-emerald-600" />
                ) : (
                    <House className="w-5 h-5 text-emerald-600" />
                )}
                <div>
                    <p className="text-sm text-gray-500">
                        Address
                    </p>
                    <span
                        className={`text-sm font-medium`}
                    >
                        {listing.physical_address}
                    </span>
                </div>
            </div>
            <div className="flex items-center space-x-3">
                <PersonStanding className="w-5 h-5 text-emerald-600" />
                <div>
                    <p className="text-sm text-gray-500">
                        Roommates
                    </p>
                    <span
                        className={`text-sm font-medium`}
                    >
                        {listing.number_of_roommates}
                    </span>
                </div>
            </div>
            <div className="flex items-center space-x-3">
                <Bed className="w-5 h-5 text-emerald-600" />
                <div>
                    <p className="text-sm text-gray-500">
                        Rooms
                    </p>
                    <span
                        className={`text-sm font-medium`}
                    >
                        {listing.number_of_bedrooms}
                    </span>
                </div>
            </div>
            <div className="flex items-center space-x-3">
                <CarFront className="w-5 h-5 text-emerald-600" />
                <div>
                    <p className="text-sm text-gray-500">
                        Distance from Campus
                    </p>
                    <span
                        className={`text-sm font-medium`}
                    >
                        {listing.distance_from_campus_minutes} min
                    </span>
                </div>
            </div>
        </>
    )
}