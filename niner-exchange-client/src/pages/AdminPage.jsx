import { useEffect, useState } from "react";
import { fetchContentTypes, fetchReports, fetchExchangeZones, approveReport, denyReport } from "../services/adminApi"
import { Flag, X, Check, ExternalLink } from 'lucide-react'
import { useNavigate } from "react-router-dom";

export default function AdminPage() {
    const [contentTypes, setContentTypes] = useState([])
    const [contentTypeMap, setContentTypeMap] = useState({})
    const [contentTypeMapReversed, setContentTypeMapReversed] = useState({})
    const [reports, setReports] = useState([])
    const [zones, setZones] = useState([])
    const [selectedType, setSelectedType] = useState("ALL")
    const [selectedStatus, setSelectedStatus] = useState("PENDING")
    const [selectedReason, setSelectedReason] = useState("SPAM")
    const navigate = useNavigate()


    useEffect(() => {
        // Content type map is used to match the model's unique id to a string and vice versa
        fetchContentTypes().then((data) => {
            setContentTypes(data);

            const newMap = {}
            for (let i = 0; i < data.length; i++) {
                newMap[data[i].model] = data[i].id
            }

            setContentTypeMap(newMap)

            const newMapReversed = {}
            for (let i = 0; i < data.length; i++) {
                newMapReversed[data[i].id] = data[i].model
            }

            setContentTypeMapReversed(newMapReversed)
        });

        console.log("Fetching reports")
        fetchReports(contentTypeMap, selectedType, selectedReason, selectedStatus).then((data) => {
            setReports(data);
        });

        console.log("Fetching exchange zones")
        fetchExchangeZones().then((data) => {
            setZones(data);
        });
    }, [selectedType, selectedReason, selectedStatus])

    const handleApproval = async (report) => {
        console.log("Report Approved")
        await approveReport(report)
        setReports(reports.filter((r) => r.object_id != report.object_id))
    }

    const handleDenial = async (report) => {
        console.log("Report Denied")
        await denyReport(report)
        setReports(reports.filter((r) => r.id != report.id))
    }

    function getReportLabel(report) {
        switch (contentTypeMapReversed[report.content_type]) {
            case "listing":
                return report.content_object.title
            case "user":
                return report.content_object.username
            case "review":
                return report.content_object.title
            default:
                return "UNKOWN REPORT TYPE"
        }
    }

    function getObjectPath(report) {
        switch (contentTypeMapReversed[report.content_type]) {
            case "listing":
                return "/listing/"
            case "user":
                return "/profile/"
            case "review":
                return "/profile/"
            default:
                return "UNKNOWN REPORT TYPE"
        }
    }


    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            <main className="max-w-7xl mx-auto px-6 py-10">
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Portal</h1>
                    <p className="text-gray-600">Manage reports and content moderation</p>
                </div>
                
                {/* Filter bar */}
                <div className="bg-white shadow-lg rounded-xl p-6 mb-6 border border-gray-200">
                    <div className="flex flex-wrap gap-4">
                        <div className="flex flex-col">
                            <label className="text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Content Type</label>
                            <select 
                                name="selectedType" 
                                id="selectedType" 
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
                                onChange={(e) => setSelectedStatus(e.target.value)}
                                className="px-4 py-2.5 bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all cursor-pointer hover:shadow-md"
                            >
                                <option value="PENDING">Pending</option>
                                <option value="APPROVED">Approved</option>
                                <option value="DENIED">Denied</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Results */}
                <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-gray-200">
                    {/* Table Header */}
                    <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 py-4 grid grid-cols-[auto_2fr_1fr_1fr_1.5fr_auto] gap-6 items-center">
                        <div className="w-6"></div>
                        <div className="text-sm font-bold text-white uppercase tracking-wider">Content</div>
                        <div className="text-sm font-bold text-white uppercase tracking-wider">Reason</div>
                        <div className="text-sm font-bold text-white uppercase tracking-wider">Status</div>
                        <div className="text-sm font-bold text-white uppercase tracking-wider">Created</div>
                        <div className="text-sm font-bold text-white uppercase tracking-wider text-right">Actions</div>
                    </div>

                    {/* Table Body */}
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
                                        <div key={report.id} className="px-6 py-4 grid grid-cols-[auto_2fr_1fr_1fr_1.5fr_auto] gap-6 items-center hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 group">
                                            <div className="w-6">
                                                <Flag className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform" />
                                            </div>
                                            
                                            <div className="flex items-center gap-3">
                                                <button 
                                                    type="button" 
                                                    onClick={() => navigate(`${getObjectPath(report)}${report.object_id}`)} 
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
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                                                    report.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                                                    report.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                                                    'bg-red-100 text-red-800'
                                                }`}>
                                                    {report.status}
                                                </span>
                                            </div>
                                            
                                            <div className="text-sm text-gray-600 font-mono">
                                                {report.created_at}
                                            </div>
                                            
                                            <div className="flex gap-2 justify-end">
                                                {(report.status === "PENDING") && (
                                                    <>
                                                        <button 
                                                            type='button' 
                                                            onClick={() => handleApproval(report)} 
                                                            className='p-2.5 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-lg transition-all shadow-md hover:shadow-lg hover:scale-105 transform'
                                                        >
                                                            <Check className="w-4 h-4 text-white" />
                                                        </button>
                                                        <button 
                                                            type="button" 
                                                            onClick={() => handleDenial(report)} 
                                                            className="p-2.5 bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-lg transition-all shadow-md hover:shadow-lg hover:scale-105 transform"
                                                        >
                                                            <X className="w-4 h-4 text-white" />
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    )
                                })
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}