import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Search,
    BookOpen,
    Home,
    Package,
    Briefcase,
} from 'lucide-react';
import TextbookForm from '../components/createForm/textbooksForm.jsx';
import SubleaseForm from '../components/createForm/SubleaseForm.jsx';
import MarketplaceForm from '../components/createForm/MarketplaceForm.jsx';
import ApplyFairPrice from '../components/createForm/ApplyFairPrice.jsx';
import { submitFullListing } from '../services/listingApi.js';

// Gemini's guided learning helped me debug an issue with sending form data between components
export default function CreateListingPage() {
    const [viewMode, setViewMode] = useState('form');
    const [imageFiles, setImageFiles] = useState([]);
    const navigate = useNavigate()
    // Used this tutorial to learn to display images: https://reacthustle.com/blog/react-preview-images-before-uploading
    const urls = imageFiles.map((file) => URL.createObjectURL(file));
    const allformData = {
        listing_type: 'TEXTBOOK',
        title: '',
        description: '',
        price: '',

        course_code: '',
        condition: 'NEW',
        price_new: '',

        property_type: 'APARTMENT',
        start_date: '',
        end_date: '',
        distance_from_campus_minutes: '',
        number_of_bedrooms: '',
        number_of_roommates: '',

        rate_type: 'FIXED',
    };
    const [formData, setFormData] = useState(allformData);

    const priceUnitLabel = useMemo(() => {
        if (formData.listing_type === 'SERVICE') {
            if (formData.rate_type === 'HOURLY') {
                return "/hr";
            }
            else if (formData.rate_type === 'PERSON') {
                return "/person"
            }
            else if (formData.rate_type === 'GROUP') {
                return "/group"
            }
            else if (formData.rate_type === 'UNIT') {
                return "/unit"
            }
        }
        if (formData.listing_type === 'SUBLEASE') return '/mo';
        return '$';
    }, [formData.listing_type, formData.rate_type]);

    const categoryForm = useMemo(() => {
        switch (formData.listing_type) {
            case 'TEXTBOOK':
                return <TextbookForm
                    formData={formData}
                    onChange={handleChange} />;
            case 'SUBLEASE':
                return <SubleaseForm
                    formData={formData}
                    onChange={handleChange} />;
            case 'ITEM':
                return <MarketplaceForm
                    formData={formData}
                    onChange={handleChange} />;
            default:
                return <></>;
        }
    }, [formData, handleChange]);

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }))
    }

    // https://reacthustle.com/blog/react-preview-images-before-uploading
    function handleImageUpload(event) {
        const files = Array.from(event.target.files);
        if (files.length < 4) {
            setImageFiles(files);
        } else {
            alert("Maximum of 3 images")
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (formData.listing_type === 'TEXTBOOK' || formData.listing_type === 'ITEM') {
            setViewMode('calculator')
        }
        else {
            const newListing = await submitFullListing(formData, imageFiles)
            console.log("Listing ID: " + newListing);
            navigate(`/listing/${newListing}`)
        }
    };

    function resetForm() {
        setFormData(allformData);
        setImageFiles([]);
    }


    // I may reset the fields if the listing_type is changed
    function handleIconClick(catId) {
        resetForm()
        allformData.listing_type = catId;
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Remove header and footer */}
            {/* Header */}
            <main className='flex-1 flex items-center justify-center px-20 py-5'>
                {viewMode === 'form' ? (
                    <form method='post' onSubmit={handleSubmit} className='shadow rounded-lg max-w-lg w-full p-6 bg-zinc-300 text-gray-600 text-sm'>
                        <h2 className='text-center text-black text-lg font-semibold py-1'>What are you selling today?</h2>
                        <div className='flex flex-wrap *:w-1/2 sm:*:w-1/4 *:items-center *:flex-col *:flex *:rouded-md *:border *:p-1 *:text-black'>
                            <button type='reset' onClick={() => handleIconClick('TEXTBOOK')} className={`rounded-l-md hover:bg-green-600 ${formData.listing_type === 'TEXTBOOK' ? 'bg-green-600' : 'bg-white'}`}>
                                <BookOpen />
                                <p>Textbook</p>
                            </button>
                            <button type='reset' onClick={() => handleIconClick('SUBLEASE')} className={`hover:bg-green-600 ${formData.listing_type === 'SUBLEASE' ? 'bg-green-600' : 'bg-white'}`}>
                                <Home />
                                <p>Sublease</p>
                            </button>
                            <button type='reset' onClick={() => handleIconClick('ITEM')} className={`hover:bg-green-600 ${formData.listing_type === 'ITEM' ? 'bg-green-600' : 'bg-white'}`}>
                                <Package />
                                <p>Item</p>
                            </button>
                            <button type='reset' onClick={() => handleIconClick('SERVICE')} className={`rounded-r-md hover:bg-green-600 ${formData.listing_type === 'SERVICE' ? 'bg-green-600' : 'bg-white'}`}>
                                <Briefcase />
                                <p>Service</p>
                            </button>
                        </div>
                        <div className='flex flex-col gap-1'>
                            {(formData.listing_type === 'TEXTBOOK' || formData.listing_type === 'ITEM') && (
                                <small className='text-yellow-700'>*Price can be set in the next step with our <em>"Fair Price Calculator"</em></small>
                            )}
                            <label htmlFor="title">Title: </label>
                            <input type="text" name="title" id="title" placeholder='Title here' required value={formData.title} onChange={handleChange} />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="description">Description </label>
                            <textarea name="description" id="description" placeholder='Max length - 1000 characters' required maxLength={1000} value={formData.description} onChange={handleChange}></textarea>
                        </div>
                        {(formData.listing_type === 'SERVICE') && (
                            <div className='flex flex-col gap-1'>
                                <label htmlFor="rate_type">Rate Type: </label>
                                <select name="rate_type" id="rate_type" required value={formData.rate_type} onChange={handleChange}>
                                    <option value="FIXED">Fixed Rate</option>
                                    <option value="HOURLY">Hourly</option>
                                    <option value="UNIT">Per Unit</option>
                                    <option value="PERSON">Per Person</option>
                                    <option value="GROUP">Per Group</option>
                                </select>
                            </div>
                        )}
                        {/* Only want the price to show for this form for services and subleasing */}
                        {(formData.listing_type === 'SERVICE' || formData.listing_type === 'SUBLEASE') && (
                            <div className='flex flex-col gap-1'>
                                <label htmlFor="price">Price: </label>
                                <input type="number" name="price" id="price" placeholder={priceUnitLabel} required value={formData.price} onChange={handleChange} />
                            </div>
                        )}
                        <div>
                            <label htmlFor="images" className='inline-block my-3 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700'>Upload Images</label>
                            <input type="file" name='images' id='images' multiple accept='.png, .jpg' className='opacity-0 absolute' required onChange={handleImageUpload} />
                            <small className='text-yellow-700 block sm:inline'> *Maximum of 3 images per post</small>
                            <div className='flex flex-row justify-around gap-1'>
                                {/* https://reacthustle.com/blog/react-preview-images-before-uploading */}
                                {urls.map((url, i) => (
                                    <img key={i} src={url} alt={imageFiles[i].name} className='w-1/3 h-auto rounded' />
                                ))}
                            </div>
                        </div>
                        {categoryForm}
                        <button type='submit' className='my-3 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700'>
                            {(formData.listing_type === 'SERVICE' || formData.listing_type === 'SUBLEASE')
                                ? 'Post'
                                : 'Go to Fair Price Calculator'
                            }
                        </button>
                    </form>) : (
                    <ApplyFairPrice formData={formData} imageFiles={imageFiles} onChange={handleChange} onBackClick={() => setViewMode('form')} />
                )}
            </main>
        </div>
    );
}
