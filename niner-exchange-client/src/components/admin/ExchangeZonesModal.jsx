import { MapPin, X, Plus, Edit2, Trash2, Save, ArrowLeft } from 'lucide-react';
import MapLocationPicker from '../messaging/transaction/MapLocationPicker';
import { useState, useEffect } from 'react';
import ConfirmationModal from '../common/ConfirmationModal';

export default function ExchangeZonesModal({
    zones,
    selectedZoneId,
    setSelectedZoneId,
    closeZonesModal,
    handleSaveZones,
    handleCreateZone,
    handleUpdateZone,
    handleDeleteZone,
}) {
    const [mode, setMode] = useState('list'); // list, create, edit
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        latitude: 35.3071,
        longitude: -80.7352,
        is_active: true,
    });

    useEffect(() => {
        if (selectedZoneId && mode === 'edit') {
            const zone = zones.find(
                (z) => String(z.id) === String(selectedZoneId),
            );
            if (zone) {
                setFormData({
                    name: zone.name,
                    description: zone.description,
                    latitude: parseFloat(zone.latitude),
                    longitude: parseFloat(zone.longitude),
                    is_active: zone.is_active,
                });
            }
        } else if (mode === 'create') {
            setFormData({
                name: '',
                description: '',
                latitude: 35.3071,
                longitude: -80.7352,
                is_active: true,
            });
        }
    }, [selectedZoneId, mode, zones]);

    const handleLocationSelect = (lat, lng) => {
        setFormData((prev) => ({
            ...prev,
            latitude: lat,
            longitude: lng,
        }));
    };

    const handleSubmit = async () => {
        if (mode === 'create') {
            await handleCreateZone(formData);
            setMode('list');
        } else if (mode === 'edit') {
            await handleUpdateZone(selectedZoneId, formData);
            setMode('list');
        }
    };

    const handleDeleteClick = () => {
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        await handleDeleteZone(selectedZoneId);
        setSelectedZoneId('');
        setShowDeleteModal(false);
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={closeZonesModal}
        >
            <div
                className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 py-4 flex justify-between items-center rounded-t-2xl">
                    <div className="flex items-center gap-2">
                        <MapPin className="w-6 h-6 text-white" />
                        <h2 className="text-xl font-bold text-white">
                            {mode === 'list'
                                ? 'Manage Exchange Zones'
                                : mode === 'create'
                                  ? 'Create New Zone'
                                  : 'Edit Exchange Zone'}
                        </h2>
                    </div>
                    <button
                        onClick={closeZonesModal}
                        className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    {mode === 'list' ? (
                        <>
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-medium text-gray-700 block">
                                    Select a zone to view details or edit
                                </label>
                                <button
                                    onClick={() => {
                                        setMode('create');
                                        setSelectedZoneId('');
                                    }}
                                    className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium"
                                >
                                    <Plus className="w-4 h-4" />
                                    Add New Zone
                                </button>
                            </div>

                            <MapLocationPicker
                                locations={zones.filter((z) => z.is_active)}
                                selectedId={selectedZoneId}
                                onSelect={(id) => setSelectedZoneId(String(id))}
                                heightClass="h-96"
                            />

                            {selectedZoneId &&
                                zones.find(
                                    (z) =>
                                        String(z.id) === String(selectedZoneId),
                                ) && (
                                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 flex justify-between items-start">
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-1">
                                                {
                                                    zones.find(
                                                        (z) =>
                                                            String(z.id) ===
                                                            String(
                                                                selectedZoneId,
                                                            ),
                                                    )?.name
                                                }
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                {
                                                    zones.find(
                                                        (z) =>
                                                            String(z.id) ===
                                                            String(
                                                                selectedZoneId,
                                                            ),
                                                    )?.description
                                                }
                                            </p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => setMode('edit')}
                                                className="p-2 text-emerald-600 hover:bg-emerald-100 rounded-lg transition-colors"
                                                title="Edit Zone"
                                            >
                                                <Edit2 className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={handleDeleteClick}
                                                className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                                title="Deactivate Zone"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                )}
                        </>
                    ) : (
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Zone Name
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                name: e.target.value,
                                            })
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                        placeholder="e.g., Student Union Entrance"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Description
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.description}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                description: e.target.value,
                                            })
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                        placeholder="Brief description of the location"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Location
                                </label>
                                <p className="text-xs text-gray-500 mb-2">
                                    Click on the map to set the location
                                </p>
                                <MapLocationPicker
                                    locations={[
                                        {
                                            id: 'new',
                                            latitude: formData.latitude,
                                            longitude: formData.longitude,
                                            name: formData.name || 'New Zone',
                                        },
                                    ]}
                                    selectedId="new"
                                    onSelect={() => {}}
                                    heightClass="h-80"
                                    readOnly={false}
                                    onLocationSelect={handleLocationSelect}
                                />
                            </div>

                            <div className="flex gap-4 pt-4 border-t border-gray-200">
                                <button
                                    onClick={() => setMode('list')}
                                    className="flex items-center justify-center gap-2 px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-all text-gray-800 font-semibold"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Back
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    disabled={
                                        !formData.name || !formData.description
                                    }
                                    className="flex-1 flex items-center justify-center gap-2 py-2 bg-gradient-to-br from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 rounded-lg transition-all shadow-md hover:shadow-lg text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Save className="w-4 h-4" />
                                    {mode === 'create'
                                        ? 'Create Zone'
                                        : 'Save Changes'}
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <ConfirmationModal
                    isOpen={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    onConfirm={confirmDelete}
                    title="Deactivate Exchange Zone"
                    message="Are you sure you want to deactivate this exchange zone? This action cannot be undone."
                    confirmText="Deactivate"
                    type="danger"
                />
            </div>
        </div>
    );
}
