import { MapPin, X } from 'lucide-react'
import MapLocationPicker from '../messaging/transaction/MapLocationPicker'

export default function ExchangeZonesModal({
    zones,
    selectedZoneId,
    setSelectedZoneId,
    closeZonesModal,
    handleSaveZones
}) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={closeZonesModal}>
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 py-4 flex justify-between items-center rounded-t-2xl">
                    <div className="flex items-center gap-2">
                        <MapPin className="w-6 h-6 text-white" />
                        <h2 className="text-xl font-bold text-white">Manage Exchange Zones</h2>
                    </div>
                    <button
                        onClick={closeZonesModal}
                        className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-3 block">
                            Select and manage exchange zones on campus
                        </label>
                        <MapLocationPicker
                            locations={zones}
                            selectedId={selectedZoneId}
                            onSelect={(id) => setSelectedZoneId(String(id))}
                            heightClass="h-96"
                        />
                    </div>

                    {selectedZoneId && zones.find(z => String(z.id) === String(selectedZoneId)) && (
                        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                            <h3 className="font-semibold text-gray-900 mb-1">
                                {zones.find(z => String(z.id) === String(selectedZoneId))?.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                                {zones.find(z => String(z.id) === String(selectedZoneId))?.description}
                            </p>
                        </div>
                    )}

                    <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3">
                        <p className="text-xs text-blue-800">
                            These exchange zones will be available for students to select when proposing transactions.
                        </p>
                    </div>

                    <div className="flex gap-4 pt-4 border-t border-gray-200">
                        <button
                            onClick={closeZonesModal}
                            className="flex-1 py-3 bg-gray-200 hover:bg-gray-300 rounded-lg transition-all text-gray-800 font-semibold"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSaveZones}
                            className="flex-1 py-3 bg-gradient-to-br from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 rounded-lg transition-all shadow-md hover:shadow-lg text-white font-semibold"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
