import { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {fetchListingById} from '../services/listingApi.js';
import TextbookForm from '../components/createForm/textbooksForm.jsx';
import SubleaseForm from '../components/createForm/SubleaseForm.jsx';
import MarketplaceForm from '../components/createForm/MarketplaceForm.jsx';
import { submitFullListing } from '../services/listingApi.js';


export default function EditListingPage() {
    const { id } = useParams();
    const [formData, setFormData] = useState([]);
    const [imageFiles, setImageFiles] = useState([]);
    const navigate = useNavigate()
    const urls = imageFiles.map((file) => URL.createObjectURL(file));

    useEffect(() => {
        console.log("fetching listing")
        fetchListingById(id).then((data) => {
            setFormData(data);
        });
    }, [id]);

    function handleChange(event) {
        const {name, value} = event.target;

        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const updatedListing = await submitFullListing(formData, imageFiles)
        navigate(`/listing/${updatedListing}`)
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

    const priceUnitLabel = useMemo(() => {
            if (formData.listing_type === 'service') return '/hr';
            if (formData.listing_type === 'sublease') return '/mo';
            return '$';
        }, [formData.listing_type]);

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
        }, [formData]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Remove header and footer */}
            {/* Header */}
            <main className='flex-1 flex items-center justify-center px-20 py-5'>
                <form method='put'  onSubmit={handleSubmit} className='shadow rounded-lg max-w-lg w-full p-6 bg-zinc-300 text-gray-600 text-sm'>
                    <h2>Edit Your Listing</h2>
                    <div className='flex flex-col gap-1'>
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
                        Post
                    </button>
                </form>
            </main>
        </div>
    );
}