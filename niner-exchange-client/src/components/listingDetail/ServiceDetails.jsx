import { DollarSignIcon } from 'lucide-react';

export default function ServiceDetails({ listing }) {
    const getRateText = (rate_type) => {
        switch (rate_type) {
            case 'FIXED':
                return 'Fixed Rate';
            case 'HOURLY':
                return 'Hourly';
            case 'UNIT':
                return 'Per Unit';
            case 'PERSON':
                return 'Per Person';
            case 'GROUP':
                return 'Per Group';
            default:
                return rate_type;
        }
    };

    return (
        <>
            <div className="flex items-center space-x-3">
                <DollarSignIcon className="w-5 h-5 text-emerald-600" />
                <div>
                    <p className="text-sm text-gray-500">
                        Rate Type
                    </p>
                    <span className={`text-sm font-medium text-gray-900`}>
                        {getRateText(listing.rate_type)}
                    </span>
                </div>
            </div>
        </>
    )
}