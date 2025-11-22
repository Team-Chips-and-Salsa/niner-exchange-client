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
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <main className="flex flex-col m-10 gap-5">
                <h1 className="text-lg font-bold">Admin Portal</h1>
                {/* Filter bar */}
                <div className="bg-neutral-400 flex flex-row p-3 *:bg-neutral-100 w-fit gap-x-3">
                    <div>
                        <select name="selectedType" id="selectedType" onChange={(e) => setSelectedType(e.target.value)}>
                            <option value="ALL">All</option>
                            <option value="LISTING">Listing</option>
                            <option value="REVIEW">Review</option>
                            <option value="USER">User</option>
                            <option value="ZONES">Exchange Zones</option>
                        </select>
                    </div>
                    <div>
                        <select name="selectedReason" id="selectedReason" onChange={(e) => setSelectedReason(e.target.value)}>
                            <option value="SPAM">Spam</option>
                            <option value="INNAPROPRIATE">Innapropriate</option>
                            <option value="HARASSMENT">Harassment</option>
                            <option value="SCAM">Scam</option>
                            <option value="OTHER">Other</option>
                        </select>
                    </div>
                    <div>
                        <select name="selectedStatus" id="selectedStatus" onChange={(e) => setSelectedStatus(e.target.value)}>
                            <option value="PENDING">Pending</option>
                            <option value="APPROVED">Approved</option>
                            <option value="DENIED">Denied</option>
                        </select>
                    </div>
                </div>
                {/* Results */}
                <div className="bg-neutral-400 flex flex-col p-2 gap-y-3 *:bg-neutral-200 ">
                    {selectedType === "ZONES" ? (
                        // How do we want to display zones?
                        <></>
                    ) : (
                        <>
                            {reports.map((report) => {
                                return (
                                    <div key={report.id} className="flex justify-between p-1">
                                        {/* Need to figure out how to dynamically link to reviews(/profile), users(/profile) and listings(/listing) */}
                                        <button type="button" onClick={() => navigate(`${getObjectPath(report)}${report.object_id}`)} className="border rounded-full p-1">
                                            <ExternalLink></ExternalLink>
                                        </button>
                                        <p>{getReportLabel(report)}</p>
                                        <p>Reason: {report.reason}</p>
                                        <p>Status: {report.status}</p>
                                        <p>Created: {report.created_at}</p>
                                        {(report.status === "PENDING") && (
                                            <>
                                                <button type='button' onClick={() => handleApproval(report)} className='border rounded-full bg-green-500 p-1'>
                                                    <Check></Check>
                                                </button>
                                                <button type="button" onClick={() => handleDenial(report)} className="border rounded-full bg-red-500 p-1">
                                                    <X></X>
                                                </button>
                                            </>
                                        )}
                                    </div>
                                )
                            })}
                        </>
                    )}
                </div>
            </main>
        </div>
    )
}