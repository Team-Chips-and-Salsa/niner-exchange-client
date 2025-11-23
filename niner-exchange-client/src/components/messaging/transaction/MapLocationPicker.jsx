import React, { useEffect, useMemo } from 'react';
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMap,
    Circle,
} from 'react-leaflet';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

function FlyToSelection({ center, zoom }) {
    const map = useMap();
    useEffect(() => {
        if (!map || !center) return;
        const [lat, lng] = center;
        if (Number.isFinite(lat) && Number.isFinite(lng)) {
            map.flyTo(center, zoom ?? 16, { duration: 0.75 });
        }
    }, [center, zoom, map]);
    return null;
}

export default function MapLocationPicker({
                                              locations = [],
                                              selectedId,
                                              onSelect,
                                              className = '',
                                              heightClass = 'h-72',
                                          }) {
    const defaultIcon = useMemo(
        () =>
            new L.Icon({
                iconUrl: markerIcon,
                iconRetinaUrl: markerIcon2x,
                shadowUrl: markerShadow,
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41],
            }),
        []
    );

    const parsed = useMemo(() => {
        return (locations || [])
            .map((l) => ({
                ...l,
                lat:
                    typeof l.latitude === 'string'
                        ? parseFloat(l.latitude)
                        : l.latitude,
                lng:
                    typeof l.longitude === 'string'
                        ? parseFloat(l.longitude)
                        : l.longitude,
            }))
            .filter((l) => Number.isFinite(l.lat) && Number.isFinite(l.lng));
    }, [locations]);

    const defaultCenter = useMemo(() => {
        if (parsed.length > 0) return [parsed[0].lat, parsed[0].lng];
        return [35.3075, -80.734];
    }, [parsed]);

    const selectedLoc = useMemo(
        () => parsed.find((l) => String(l.id) === String(selectedId)),
        [parsed, selectedId]
    );

    const selectionCenter = selectedLoc
        ? [selectedLoc.lat, selectedLoc.lng]
        : null;

    const mapKey = `${parsed.length}-${selectedId}`;

    return (
        <div
            className={`relative z-0 w-full overflow-hidden rounded-xl border border-gray-200 ${heightClass} ${className}`}
        >
            <MapContainer
                key={mapKey}       
                center={defaultCenter}
                zoom={15}
                scrollWheelZoom={false}
                className="w-full h-full"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {selectionCenter && (
                    <FlyToSelection center={selectionCenter} zoom={17} />
                )}

                {parsed.map((zone) => (
                    <Marker
                        key={zone.id}
                        position={[zone.lat, zone.lng]}
                        icon={defaultIcon}
                        eventHandlers={{
                            click: () => onSelect && onSelect(zone.id),
                        }}
                    >
                        <Popup>
                            <div className="space-y-1">
                                <p className="font-semibold text-gray-900">
                                    {zone.name}
                                </p>
                                {zone.description && (
                                    <p className="text-xs text-gray-600 max-w-[220px]">
                                        {zone.description}
                                    </p>
                                )}
                                <button
                                    className="mt-2 w-full text-sm px-3 py-1.5 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 transition"
                                    onClick={() =>
                                        onSelect && onSelect(zone.id)
                                    }
                                >
                                    Select this spot
                                </button>
                            </div>
                        </Popup>
                    </Marker>
                ))}

                {selectedLoc && (
                    <Circle
                        center={[selectedLoc.lat, selectedLoc.lng]}
                        radius={30}
                        pathOptions={{
                            color: '#059669',
                            fillColor: '#10B981',
                            fillOpacity: 0.25,
                        }}
                    />
                )}
            </MapContainer>

            <div className="pointer-events-none absolute top-3 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full shadow text-xs font-medium text-gray-700">
                Tap a pin to choose the exchange zone
            </div>
        </div>
    );
}
