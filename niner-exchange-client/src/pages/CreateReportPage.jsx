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

    // Add fetch for review and user
    useEffect(() => {
        switch (type) {
            case "listing":
                console.log("fetching listing")
                fetchListingById(id).then((data) => {
                    setFormData(data);
                });
                break
            case "review":
                console.log("fetching reviews by id")
                break
            case "user":
                console.log("fetching reviews by username")
                break
            default:
                console.log("Incorrect type")
        }
    }, [id, type]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true)
        console.log("Report Created")
        try {
            await createReport(contentTypeMap, type, selectedReason, description, id)
        } catch (error) {
            console.error("Report failed to create:", error)
        }
        // add switch, only works for listings
        navigate(`/${type}/${formData.listing_id}`)
    }



    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <main className='flex-1 flex items-center justify-center px-20 py-5'>
                <form method='POST' onSubmit={handleSubmit} className='shadow rounded-lg max-w-lg w-full *:my-3 p-6 bg-zinc-300 text-gray-600 text-sm'>
                    <div className='flex justify-between'>
                        <h2>Make a Report</h2>
                        {/* add switch or method for the id in the url*/}
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