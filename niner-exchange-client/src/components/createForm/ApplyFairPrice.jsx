import {
    ChevronLeft,
} from 'lucide-react';
import { submitFullListing } from '../../services/listingApi';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const BASE_URL = import.meta.env.VITE_BASE_URL;


export default function ApplyFairPrice({ formData, imageFiles, onChange, onBackClick }) {
    const [suggested_price, setSuggestedPrice] = useState(null);
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('django_access_token');
        if (!token) {
            throw new Error("Unauthorized");
        }

        const fetchPrice = async (token, formData) => {
            const response = await fetch(`${BASE_URL}/api/pricing/suggest/`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify(formData)
            })

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const suggested_price = await response.json();
            setSuggestedPrice(suggested_price);
        }
        fetchPrice(token, formData)
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const payload = {
            ...formData,
            price_new: suggested_price['median_price_new']
        };
        setIsLoading(true)
        const newListing = await submitFullListing(payload, imageFiles)
        navigate(`/listing/${newListing}`)
    }


    return (
        <div className='shadow rounded-lg max-w-lg w-full p-6 bg-zinc-300'>
            <button type='button' onClick={() => onBackClick('form')} className='shadow rounded-md p-1 bg-zinc-400'>
                <ChevronLeft />
            </button>
            <h1>Fair Price Calculation</h1>
            {/* Fair Price Suggestion */}
            <div className='flex flex-col items-end'>
                <p>Suggested price: </p>
                <small><em>according to data from eBay</em></small>
                {(suggested_price != null) ? (
                    <div>
                        <p>Market Price (NEW): </p>
                        <p className='text-green-500 text-3xl font-bold underline'>${Object.values(suggested_price)[0]}</p>
                        {(formData.condition != "NEW") && (
                            <>
                                <p>Market Price ({formData.condition}) </p>
                                <p className='text-orange-500 text-3xl font-bold underline'>${Object.values(suggested_price)[1]}</p>
                            </>
                        )}
                    </div>
                ) : (
                    <p className='text-3xl font-bold'>Loading...</p>
                )}
            </div>
            <div className='flex flex-col gap-1'>
                <label htmlFor="price">Price: </label>
                <input type="number" name="price" id="price" placeholder={'$'} required value={formData.price} onChange={onChange} />
            </div>
            <button
                type="submit"
                onSubmit={handleSubmit}
                disabled={isLoading}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isLoading ? 'Posting...' : 'Post'}
            </button>
        </div>
    )
}