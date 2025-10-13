import React, { useMemo, useState } from 'react';
import { DollarSign, MapPin, X } from 'lucide-react';
import MapLocationPicker from './MapLocationPicker.jsx';

export default function TransactionProposalModal({
    isOpen,
    onClose,
    onSubmit,
    locations = [],
}) {
    const [price, setPrice] = useState('');
    const [selectedLocationId, setSelectedLocationId] = useState('');

    const locationOptions = useMemo(() => {
        if (!locations || locations.length === 0) {
            // Fallback single location with proper coordinates
            return [
                {
                    id: 1,
                    name: 'UNC Charlotte Student Union',
                    description:
                        'Meetup spot near the main entrance of the Popp Martin Student Union.',
                    latitude: '35.308643',
                    longitude: '-80.733747',
                },
            ];
        }
        return locations;
    }, [locations]);

    const selectedZone = useMemo(() => {
        return locationOptions.find(
            (z) => String(z.id) === String(selectedLocationId),
        );
    }, [locationOptions, selectedLocationId]);

    const canSubmit = price && selectedLocationId;

    const handleSubmit = () => {
        if (!canSubmit) return;
        onSubmit({
            price,
            meetup_location: selectedLocationId,
            exchangeZoneName: selectedZone?.name,
            exchangeLat: selectedZone?.latitude
                ? parseFloat(selectedZone.latitude)
                : undefined,
            exchangeLng: selectedZone?.longitude
                ? parseFloat(selectedZone.longitude)
                : undefined,
        });
        setPrice('');
        setSelectedLocationId('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-3xl shadow-2xl">
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900">
                        Propose Meetup
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-600" />
                    </button>
                </div>

                <div className="p-6 space-y-5">
                    {/* Price input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Offer Price
                        </label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="0.00"
                                step="0.01"
                                min="0"
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                            />
                        </div>
                    </div>

                    {/* Map selector */}
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <MapPin className="w-5 h-5 text-emerald-600" />
                            <label className="text-sm font-medium text-gray-700">
                                Exchange Zone
                            </label>
                        </div>
                        <MapLocationPicker
                            locations={locationOptions}
                            selectedId={selectedLocationId}
                            onSelect={(id) => setSelectedLocationId(String(id))}
                            heightClass="h-80"
                        />
                        {selectedZone ? (
                            <div className="mt-3 flex items-start gap-3 bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-3">
                                <MapPin className="w-5 h-5 text-emerald-600 mt-0.5" />
                                <div className="flex-1">
                                    <p className="text-sm font-semibold text-gray-900">
                                        {selectedZone.name}
                                    </p>
                                    {selectedZone.description && (
                                        <p className="text-xs text-gray-600 mt-1">
                                            {selectedZone.description}
                                        </p>
                                    )}
                                </div>
                                <button
                                    className="text-xs text-emerald-700 hover:text-emerald-800 font-medium"
                                    onClick={() => setSelectedLocationId('')}
                                >
                                    Change
                                </button>
                            </div>
                        ) : (
                            <p className="mt-2 text-xs text-gray-500">
                                Tap a pin on the map to choose your meetup spot.
                            </p>
                        )}
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3">
                        <p className="text-xs text-blue-800">
                            The other party will be able to accept or decline
                            this transaction request.
                        </p>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button
                            onClick={onClose}
                            className="flex-1 px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={!canSubmit}
                            className="flex-1 px-4 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 disabled:from-gray-300 disabled:to-gray-400 text-white rounded-lg font-medium transition-all shadow-md hover:shadow-lg"
                        >
                            Send Request
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
