import { Flag, ExternalLink } from 'lucide-react'

export default function ReportsList({
    reports,
    selectedType,
    openReportModal,
    getObjectPath,
    getReportLabel,
    navigate
}) {
    return (
        <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-gray-200">
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 py-4 grid grid-cols-[auto_2fr_1fr_1fr_1.5fr] gap-6 items-center">
                <div className="w-6"></div>
                <div className="text-sm font-bold text-white uppercase tracking-wider">Content</div>
                <div className="text-sm font-bold text-white uppercase tracking-wider">Reason</div>
                <div className="text-sm font-bold text-white uppercase tracking-wider">Status</div>
                <div className="text-sm font-bold text-white uppercase tracking-wider">Created</div>
            </div>

            {selectedType === "ZONES" ? (
                <div className="p-12 text-center">
                    <div className="text-gray-400 text-lg">Zone display coming soon</div>
                </div>
            ) : (
                <div className="divide-y divide-gray-100">
                    {reports.length === 0 ? (
                        <div className="p-12 text-center">
                            <Flag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <div className="text-gray-500 text-lg">No reports found</div>
                            <div className="text-gray-400 text-sm mt-1">Try adjusting your filters</div>
                        </div>
                    ) : (
                        reports.map((report) => {
                            return (
                                <div
                                    key={report.id}
                                    onClick={() => openReportModal(report)}
                                    className="px-6 py-4 grid grid-cols-[auto_2fr_1fr_1fr_1.5fr] gap-6 items-center hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 group cursor-pointer"
                                >
                                    <div className="w-6">
                                        <Flag className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform" />
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                navigate(`${getObjectPath(report)}${report.object_id}`)
                                            }}
                                            className="p-2 hover:bg-indigo-100 rounded-lg transition-all hover:scale-110"
                                        >
                                            <ExternalLink className="w-4 h-4 text-indigo-600" />
                                        </button>
                                        <span className="font-medium text-gray-900 truncate">{getReportLabel(report)}</span>
                                    </div>

                                    <div>
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-800">
                                            {report.reason}
                                        </span>
                                    </div>

                                    <div>
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${report.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                                                report.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                                                    'bg-red-100 text-red-800'
                                            }`}>
                                            {report.status}
                                        </span>
                                    </div>

                                    <div className="text-sm text-gray-600 font-mono">
                                        {report.created_at}
                                    </div>
                                </div>
                            )
                        })
                    )}
                </div>
            )}
        </div>
    )
}
