import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { X } from 'lucide-react';
import { fetchListingById } from '../services/listingApi.js';
import { fetchContentTypes } from "../services/adminApi.js";
import { createReport } from "../services/adminApi.js";

export default function CreateReportPage() {
    // We don't want to show the ID for a user though use username
    const { id, type } = useParams();
    const [formData, setFormData] = useState(null)
    const navigate = useNavigate()
    const [selectedReason, setSelectedReason] = useState("SPAM")
    const [contentTypes, setContentTypes] = useState([])
    const [contentTypeMap, setContentTypeMap] = useState({})


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
                break
            case "user":
                break
            default:
        }
    }, [id, type]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await createReport(contentTypeMap, type, selectedReason, id)
        } catch (error) {
            console.error("Report failed to create:", error)
        }
        // add switch, only works for listings
        navigate(`/${type}/${formData.listing_id}`)
    }



    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <main className='flex-1 flex items-center justify-center px-20 py-5'>
                <form method='POST' onSubmit={handleSubmit} className='shadow rounded-lg max-w-lg w-full p-6 bg-zinc-300 text-gray-600 text-sm'>
                    <div className='flex justify-between'>
                        <h2>Make a Report</h2>
                        <button type='button' onClick={() => navigate(`/${type}/${formData.listing_id}`)} className='border rounded-full bg-amber-500 p-1'>
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
                    <button type='submit' onSubmit={handleSubmit} className='my-3 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700'>
                        Report
                    </button>
                </form>
            </main>
        </div>
    )
}