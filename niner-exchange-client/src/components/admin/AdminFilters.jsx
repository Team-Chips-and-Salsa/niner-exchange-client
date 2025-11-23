import { MapPin } from 'lucide-react'

export default function AdminFilters({
    selectedType,
    setSelectedType,
    selectedReason,
    setSelectedReason,
    selectedStatus,
    setSelectedStatus,
    openZonesModal
}) {
    return (
        <div className="bg-white shadow-lg rounded-xl p-6 mb-6 border border-gray-200">
            <div className="flex flex-wrap gap-4 items-end">
                <div className="flex flex-col">
                    <label className="text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Content Type</label>
                    <select
                        name="selectedType"
                        id="selectedType"
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="px-4 py-2.5 bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all cursor-pointer hover:shadow-md"
                    >
                        <option value="ALL">All Types</option>
                        <option value="LISTING">Listing</option>
                        <option value="REVIEW">Review</option>
                        <option value="USER">User</option>
                        <option value="ZONES">Exchange Zones</option>
                    </select>
                </div>
                <div className="flex flex-col">
                    <label className="text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Report Reason</label>
                    <select
                        name="selectedReason"
                        id="selectedReason"
                        value={selectedReason}
                        onChange={(e) => setSelectedReason(e.target.value)}
                        className="px-4 py-2.5 bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all cursor-pointer hover:shadow-md"
                    >
                        <option value="SPAM">Spam</option>
                        <option value="INNAPROPRIATE">Inappropriate</option>
                        <option value="HARASSMENT">Harassment</option>
                        <option value="SCAM">Scam</option>
                        <option value="OTHER">Other</option>
                    </select>
                </div>
                <div className="flex flex-col">
                    <label className="text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Status</label>
                    <select
                        name="selectedStatus"
                        id="selectedStatus"
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="px-4 py-2.5 bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all cursor-pointer hover:shadow-md"
                    >
                        <option value="PENDING">Pending</option>
                        <option value="APPROVED">Approved</option>
                        <option value="DENIED">Denied</option>
                    </select>
                </div>
                <div className="flex flex-col ml-auto">
                    <button
                        onClick={openZonesModal}
                        className="px-4 py-2.5 bg-gradient-to-br from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all hover:shadow-md flex items-center gap-2 font-medium"
                    >
                        <MapPin className="w-4 h-4" />
                        Manage Exchange Zones
                    </button>
                </div>
            </div>
        </div>
    )
}
