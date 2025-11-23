import { X, Check } from 'lucide-react'

export default function ReportDetailsModal({
    selectedReport,
    closeModal,
    getReportLabel,
    getItemDescription,
    handleApproval,
    handleDenial
}) {
    if (!selectedReport) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={closeModal}>
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 py-4 flex justify-between items-center rounded-t-2xl">
                    <h2 className="text-xl font-bold text-white">Report Details</h2>
                    <button
                        onClick={closeModal}
                        className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Content Title</label>
                            <p className="text-lg font-semibold text-gray-900 mt-1">{getReportLabel(selectedReport)}</p>
                        </div>

                        <div>
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Item Description</label>
                            <p className="text-gray-700 mt-1 bg-gray-50 p-4 rounded-lg border border-gray-200">{getItemDescription(selectedReport)}</p>
                        </div>

                        <div>
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Report Description</label>
                            <p className="text-gray-700 mt-1 bg-gray-50 p-4 rounded-lg border border-gray-200">{selectedReport.description}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Reason</label>
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-orange-100 text-orange-800 mt-1">
                                    {selectedReport.reason}
                                </span>
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</label>
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold mt-1 ${selectedReport.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                                    selectedReport.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                                        'bg-red-100 text-red-800'
                                    }`}>
                                    {selectedReport.status}
                                </span>
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Created At</label>
                            <p className="text-gray-700 mt-1 font-mono">{selectedReport.created_at}</p>
                        </div>

                        <div>
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Reporter</label>
                            <p className="text-gray-700 mt-1">
                                {selectedReport.reporter?.first_name} {selectedReport.reporter?.last_name}
                            </p>
                        </div>
                    </div>

                    {selectedReport.status === "PENDING" && (
                        <div className="flex gap-4 pt-4 border-t border-gray-200">
                            <button
                                type='button'
                                onClick={() => handleApproval(selectedReport)}
                                className='flex-1 py-3 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-lg transition-all shadow-md hover:shadow-lg hover:scale-105 transform text-white font-semibold flex items-center justify-center gap-2'
                            >
                                <Check className="w-5 h-5" />
                                Approve Report
                            </button>
                            <button
                                type="button"
                                onClick={() => handleDenial(selectedReport)}
                                className="flex-1 py-3 bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-lg transition-all shadow-md hover:shadow-lg hover:scale-105 transform text-white font-semibold flex items-center justify-center gap-2"
                            >
                                <X className="w-5 h-5" />
                                Deny Report
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
