import React, { useState, useEffect, useMemo} from 'react';
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
        listing_type: 'textbook',
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
    };
    const [formData, setFormData] = useState(allformData);

    const priceUnitLabel = useMemo(() => {
        if (formData.listing_type === 'service') return '/hr';
        if (formData.listing_type === 'sublease') return '/mo';
        return '$';
    }, [formData.listing_type]);

    function handleChange(event) {
        const {name, value} = event.target;

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

        if (formData.listing_type === 'textbook' || formData.listing_type === 'item') {
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

    const categoryForm = useMemo(() => {
        switch (formData.listing_type) {
            case 'textbook':
                return <TextbookForm
                formData={formData}
                onChange={handleChange}/>;
            case 'sublease':
                return <SubleaseForm
                formData={formData}
                onChange={handleChange}/>;
            case 'item':
                return <MarketplaceForm
                formData={formData}
                onChange={handleChange}/>;
            default:
                return <></>;
        }
    }, [formData, handleChange]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Remove header and footer */}
            {/* Header */}
            <main className='flex-1 flex items-center justify-center px-20 py-5'>
{viewMode === 'form' ? ( 
                <form method='post'  onSubmit={handleSubmit} className='shadow rounded-lg max-w-lg w-full p-6 bg-zinc-300 text-gray-600 text-sm'>
                    <h2 className='text-center text-black text-lg font-semibold py-1'>What are you selling today?</h2>
                    <div className='flex flex-wrap justify-between *:grow *:items-center *:flex-col *:flex *:rouded-md *:border *:p-1 *:text-black'>
                        <button type='reset' onClick={() => handleIconClick('textbook')} className={`rounded-l-md hover:bg-green-600 ${formData.listing_type === 'textbook' ? 'bg-green-600' : 'bg-white'}`}>
                            <BookOpen/>
                            <p>Textbooks</p>
                        </button>
                        <button type='reset' onClick={() => handleIconClick('sublease')} className={`hover:bg-green-600 ${formData.listing_type === 'sublease' ? 'bg-green-600' : 'bg-white'}`}>
                            <Home/>
                            <p>sublease</p>
                        </button>
                        <button type='reset' onClick={() => handleIconClick('item')} className={`hover:bg-green-600 ${formData.listing_type === 'item' ? 'bg-green-600' : 'bg-white'}`}>
                            <Package/>
                            <p>item</p>
                        </button>
                        <button type='reset' onClick={() => handleIconClick('service')} className={`rounded-r-md hover:bg-green-600 ${formData.listing_type === 'service' ? 'bg-green-600' : 'bg-white'}`}>
                            <Briefcase/>
                            <p>Services</p>
                        </button>
                    </div>
                    <div className='flex flex-col gap-1'>
                        {(formData.listing_type === 'textbook' || formData.listing_type === 'item') && (
                            <small className='text-yellow-700'>*Price can be set in the next step with our <em>"Fair Price Calculator"</em></small>
                        )}
                        <label htmlFor="title">Title: </label>
                        <input type="text" name="title" id="title" placeholder='Title here' required value={formData.title} onChange={handleChange}/>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="description">Description </label>
                        <textarea name="description" id="description" placeholder='Max length - 1000 characters' required maxLength={1000} value={formData.description} onChange={handleChange}></textarea>
                    </div>
                    {/* Only want the price to show for this form for services and subleasing */}
                    {(formData.listing_type === 'service' || formData.listing_type === 'sublease') && (
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="price">Price: </label>
                            <input type="number" name="price" id="price" placeholder={priceUnitLabel} required value={formData.price} onChange={handleChange}/>
                        </div>
                    )}
                    <div>
                        <label htmlFor="images" className='inline-block my-3 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700'>Upload Images</label>
                        <input type="file" name='images' id='images' multiple accept='.png, .jpeg' className='opacity-0 absolute' required onChange={handleImageUpload}/>
                        <small className='text-yellow-700'> *Maximum of 3 images per post</small>
                        <div className='flex flex-row justify-around gap-1'>
                            {/* https://reacthustle.com/blog/react-preview-images-before-uploading */}
                            {urls.map((url, i) => (
                                <img key={i} src={url} alt={imageFiles[i].name} className='w-1/3 h-auto rounded'/>
                            ))}
                        </div>
                    </div>
                    {categoryForm}
                    <button type='submit' className='my-3 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700'>
                        {(formData.listing_type === 'service' || formData.listing_type === 'sublease')
                            ? 'Post'
                            : 'Go to Fair Price Calculator'
                        }
                    </button>
                </form> ) : (
                <ApplyFairPrice formData={formData} imageFiles={imageFiles} onChange={handleChange} onBackClick={() =>  setViewMode('form')}/>
                )}
            </main>
        </div>
    );
}
