import React from 'react';
import {
    DollarSign,
    MapPin,
    X,
    Check,
    Clock,
    ExternalLink,
} from 'lucide-react';
import { formatRelativeTime } from '../../../helpers/messaging.js';
import { MapContainer, TileLayer, Marker, Circle } from 'react-leaflet';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

export default function TransactionRequestCard({
    msg,
    isMe,
    onAccept,
    onReject,
    isSubmitting,
}) {
    const statusLc = String(msg.status || 'PENDING').toLowerCase();
    const isPending = statusLc === 'pending';
    const isAccepted = statusLc === 'accepted';
    const isRejected = statusLc === 'rejected';
    const time = msg.createdAt ? formatRelativeTime(msg.createdAt) : '';

    // Safely parse coordinates if present
    const rawLat = msg.exchangeLat ?? msg.exchange_lat;
    const rawLng = msg.exchangeLng ?? msg.exchange_lng;
    const lat = typeof rawLat === 'string' ? parseFloat(rawLat) : rawLat;
    const lng = typeof rawLng === 'string' ? parseFloat(rawLng) : rawLng;
    const hasCoords = Number.isFinite(lat) && Number.isFinite(lng);

    const markerIconDefault = new L.Icon({
        iconUrl: markerIcon,
        iconRetinaUrl: markerIcon2x,
        shadowUrl: markerShadow,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
    });

    const gmapsUrl = hasCoords
        ? `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`
        : undefined;

    return (
        <div
            className={`flex ${isMe ? 'justify-end' : 'justify-start'} mb-4 z-0`}
        >
            <div
                className={`max-w-[85vw] sm:max-w-md w-full ${isMe ? 'order-2' : 'order-1'}`}
            >
                <div
                    className={`relative rounded-2xl overflow-hidden shadow-md z-0 ${isMe ? 'bg-gradient-to-br from-emerald-50 to-emerald-100 border-2 border-emerald-300' : 'bg-white border-2 border-gray-200'}`}
                >
                    <div
                        className={`px-3 py-2 sm:px-4 sm:py-3 ${isMe ? 'bg-emerald-600' : 'bg-gray-800'} text-white`}
                    >
                        <div className="flex items-center justify-between">
                            <h3 className="font-bold text-xs sm:text-base flex items-center gap-1.5 sm:gap-2">
                                <DollarSign className="w-4 h-4 sm:w-5 sm:h-5" />
                                Transaction Proposal
                            </h3>
                            {isPending && (
                                <span className="text-[10px] sm:text-xs bg-white/20 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    Pending
                                </span>
                            )}
                            {isAccepted && (
                                <span className="text-[10px] sm:text-xs bg-green-500 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full flex items-center gap-1">
                                    <Check className="w-3 h-3" />
                                    Accepted
                                </span>
                            )}
                            {isRejected && (
                                <span className="text-[10px] sm:text-xs bg-red-500 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full flex items-center gap-1">
                                    <X className="w-3 h-3" />
                                    Declined
                                </span>
                            )}
                            {statusLc === 'completed' && (
                                <span className="text-[10px] sm:text-xs bg-gray-600 text-white px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full flex items-center gap-1">
                                    <Check className="w-3 h-3" />
                                    Completed
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="px-3 py-3 sm:px-4 sm:py-4 space-y-3">
                        {/* Listing block */}
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
                                <img
                                    src={
                                        msg.listingImage ||
                                        '/img/placeholder.png'
                                    }
                                    alt="Listing Image"
                                    className="w-full h-full object-cover rounded-full"
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                                    {msg.listingTitle || 'Listing'}
                                </h3>
                            </div>
                        </div>

                        <div className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2 sm:px-4 sm:py-3">
                            <span className="text-xs sm:text-sm text-gray-600 font-medium">
                                Price
                            </span>
                            <span className="text-xl sm:text-2xl font-bold text-emerald-600">
                                ${msg.price}
                            </span>
                        </div>

                        <div className="flex items-start gap-2 sm:gap-3 bg-gray-50 rounded-lg px-3 py-2 sm:px-4 sm:py-3">
                            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                            <div className="flex-1">
                                <p className="text-xs sm:text-sm font-medium text-gray-900 break-words">
                                    {msg.exchangeZoneName ||
                                        msg.exchange_zone_name ||
                                        'Exchange Zone'}
                                </p>
                                <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">
                                    Exchange Location
                                </p>
                            </div>
                        </div>

                        {hasCoords && (
                            <div className="relative z-0 rounded-xl overflow-hidden border border-gray-200">
                                <MapContainer
                                    center={[lat, lng]}
                                    zoom={17}
                                    scrollWheelZoom={false}
                                    dragging={true}
                                    zoomControl={false}
                                    className="w-full h-32 sm:h-44"
                                >
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <Marker
                                        position={[lat, lng]}
                                        icon={markerIconDefault}
                                    />
                                    <Circle
                                        center={[lat, lng]}
                                        radius={28}
                                        pathOptions={{
                                            color: '#059669',
                                            fillColor: '#10B981',
                                            fillOpacity: 0.25,
                                        }}
                                    />
                                </MapContainer>
                                <div className="flex justify-end p-2 bg-white">
                                    <a
                                        className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-medium text-emerald-700 hover:text-emerald-800"
                                        href={gmapsUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        View in Google Maps
                                        <ExternalLink className="w-3 h-3" />
                                    </a>
                                </div>
                            </div>
                        )}

                        <div className="flex items-center gap-2">
                            <span className="text-[10px] sm:text-xs text-gray-500">
                                You are the:{' '}
                                <span className="font-semibold text-gray-700">
                                    {isMe ? 'Buyer' : 'Seller'}
                                </span>
                            </span>
                        </div>
                    </div>

                    {!isMe && isPending && (
                        <div className="px-3 pb-3 sm:px-4 sm:pb-4 flex flex-col sm:flex-row gap-2">
                            <button
                                onClick={onReject}
                                disabled={isSubmitting}
                                className="flex-1 px-3 py-2 sm:px-4 sm:py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium text-xs sm:text-sm transition-colors flex items-center justify-center gap-2"
                            >
                                <X className="w-3 h-3 sm:w-4 sm:h-4" />
                                Decline
                            </button>
                            <button
                                onClick={onAccept}
                                className="flex-1 px-3 py-2 sm:px-4 sm:py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white rounded-lg font-medium text-xs sm:text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                            >
                                <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                                {isSubmitting ? 'Submitting...' : 'Accept'}
                            </button>
                        </div>
                    )}

                    {isAccepted && (
                        <div className="px-3 pb-3 sm:px-4 sm:pb-4">
                            <div className="bg-green-50 border border-green-200 rounded-lg px-3 py-2 sm:px-4 sm:py-3 text-center">
                                <p className="text-xs sm:text-sm font-medium text-green-800">
                                    ✓ Transaction Accepted
                                </p>
                                <p className="text-[10px] sm:text-xs text-green-600 mt-1">
                                    Coordinate exchange details with the{' '}
                                    {isMe ? 'seller' : 'buyer'}
                                </p>
                            </div>
                        </div>
                    )}

                    {isRejected && (
                        <div className="px-3 pb-3 sm:px-4 sm:pb-4">
                            <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2 sm:px-4 sm:py-3 text-center">
                                <p className="text-xs sm:text-sm font-medium text-red-800">
                                    ✕ Transaction Declined
                                </p>
                                <p className="text-[10px] sm:text-xs text-red-600 mt-1">
                                    You can propose another offer or continue
                                    chatting.
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                <div
                    className={`flex items-center gap-1 mt-1 px-2 ${isMe ? 'justify-end' : 'justify-start'}`}
                >
                    <span className="text-[10px] sm:text-xs text-gray-500">
                        {time}
                    </span>
                </div>
            </div>
        </div>
    );
}
