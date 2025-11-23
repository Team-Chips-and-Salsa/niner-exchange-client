import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { X } from 'lucide-react';
import { fetchListingById } from '../services/listingApi.js';
import { fetchUserProfile } from "../services/userApi.js";
import { fetchContentTypes } from "../services/adminApi.js";
import { createReport } from "../services/adminApi.js";

export default function CreateReportPage() {
    const { id, type } = useParams();
    const [formData, setFormData] = useState(null)
    const navigate = useNavigate()
    const [selectedReason, setSelectedReason] = useState("SPAM")
    const [contentTypes, setContentTypes] = useState([])
    const [contentTypeMap, setContentTypeMap] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [description, setDescription] = useState("")


    useEffect(() => {
        fetchContentTypes().then((data) => {
            setContentTypes(data);

            const newMap = {}
            for (let i = 0; i < data.length; i++) {
                newMap[data[i].model] = data[i].id
            }

            setContentTypeMap(newMap)
        });
    }, [])

    useEffect(() => {
        switch (type) {
            case "listing":
                fetchListingById(id).then((data) => {
                    setFormData(data);
                });
                break
            case "review":
                fetchUserProfile(id).then((data) => {
                    setFormData(data)
                })
                break;
            case "customuser":
                fetchUserProfile(id).then((data) => {
                    setFormData(data)
                })
                break
            default:
        }
    }, [id, type]);

    function navigateToObject() {
        switch (type) {
            case "listing":
                navigate(`/listing/${formData.listing_id}`)
                break;
            case "customuser":
                navigate(`/profile/${formData.id}`)
                break;
            case "review":
                navigate(`/profile/${formData.id}`)
                break;
            default:
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true)
        console.log("Report Created")
        try {
            await createReport(contentTypeMap, type, selectedReason, description, id)
        } catch (error) {
            console.error("Report failed to create:", error)
        }
        navigateToObject()
    }



    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <main className='flex-1 flex items-center justify-center px-20 py-5'>
                <form method='POST' onSubmit={handleSubmit} className='shadow rounded-lg max-w-lg w-full *:my-3 p-6 bg-zinc-300 text-gray-600 text-sm'>
                    <div className='flex justify-between'>
                        <h2>Make a Report</h2>
                        <button type='button' onClick={() => navigateToObject()} className='border rounded-full bg-amber-500 p-1'>
                            <X></X>
                        </button>
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
                        <textarea
                            name="description"
                            id="description"
                            rows={10}
                            cols={20}
                            placeholder="Optional Description"
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        onSubmit={handleSubmit}
                        disabled={isLoading}
                        className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Reporting...' : 'Report'}
                    </button>
                </form>
            </main>
        </div>
    )
}