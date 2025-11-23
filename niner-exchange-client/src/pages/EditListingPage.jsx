import { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { fetchListingById } from '../services/listingApi.js';
import TextbookForm from '../components/createForm/TextbooksForm.jsx';
import SubleaseForm from '../components/createForm/SubleaseForm.jsx';
import MarketplaceForm from '../components/createForm/MarketplaceForm.jsx';
import { submitFullListing } from '../services/listingApi.js';
import { X } from 'lucide-react';

export default function EditListingPage() {
    const { id } = useParams();
    const [formData, setFormData] = useState(null);
    const [imageFiles, setImageFiles] = useState([]);
    const navigate = useNavigate();
    const urls = imageFiles.map((file) => URL.createObjectURL(file));

    useEffect(() => {
        fetchListingById(id).then((data) => {
            setFormData(data);
        });
    }, [id]);

    const priceUnitLabel = useMemo(() => {
        if (formData?.listing_type === 'SERVICE') {
            if (formData?.rate_type === 'HOURLY') {
                return '/hr';
            } else if (formData?.rate_type === 'PERSON') {
                return '/person';
            } else if (formData?.rate_type === 'GROUP') {
                return '/group';
            } else if (formData?.rate_type === 'UNIT') {
                return '/unit';
            }
        }
        if (formData?.listing_type === 'SUBLEASE') return '/mo';
        return '$';
    }, [formData?.rate_type]);

    const categoryForm = useMemo(() => {
        switch (formData?.listing_type) {
            case 'TEXTBOOK':
                return (
                    <TextbookForm formData={formData} onChange={handleChange} />
                );
            case 'SUBLEASE':
                return (
                    <SubleaseForm formData={formData} onChange={handleChange} />
                );
            case 'ITEM':
                return (
                    <MarketplaceForm
                        formData={formData}
                        onChange={handleChange}
                    />
                );
            default:
                return <></>;
        }
    }, [formData]);

    if (formData == null) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-lg text-gray-500">Loading listing...</div>
            </div>
        );
    }

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const updatedListing = await submitFullListing(formData, imageFiles);
        navigate(`/listing/${updatedListing}`);
    };

    // https://reacthustle.com/blog/react-preview-images-before-uploading
    function handleImageUpload(event) {
        const files = Array.from(event.target.files);
        if (files.length < 4) {
            setImageFiles(files);
        } else {
            alert('Maximum of 3 images');
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <main className="flex-1 flex items-center justify-center px-20 py-5">
                <form
                    method="POST"
                    onSubmit={handleSubmit}
                    className="shadow rounded-lg max-w-lg w-full p-6 bg-zinc-300 text-gray-600 text-sm"
                >
                    <div className="flex justify-between">
                        <h2>Edit Your Listing</h2>
                        <button
                            type="button"
                            onClick={() =>
                                navigate(`/listing/${formData.listing_id}`)
                            }
                            className="border rounded-full bg-amber-500 p-1"
                        >
                            <X></X>
                        </button>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="title">Title: </label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            placeholder="Title here"
                            required
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="description">Description </label>
                        <textarea
                            name="description"
                            id="description"
                            placeholder="Max length - 1000 characters"
                            required
                            maxLength={1000}
                            value={formData.description}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    {formData.listing_type === 'SERVICE' && (
                        <div className="flex flex-col gap-1">
                            <label htmlFor="rate_type">Rate Type: </label>
                            <select
                                name="rate_type"
                                id="rate_type"
                                required
                                value={formData.rate_type}
                                onChange={handleChange}
                            >
                                <option value="FIXED">Fixed Rate</option>
                                <option value="HOURLY">Hourly</option>
                                <option value="UNIT">Per Unit</option>
                                <option value="PERSON">Per Person</option>
                                <option value="GROUP">Per Group</option>
                            </select>
                        </div>
                    )}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="price">Price: </label>
                        <input
                            type="number"
                            name="price"
                            id="price"
                            placeholder={priceUnitLabel}
                            required
                            value={formData.price}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="images"
                            className="inline-block my-3 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                            Upload Images
                        </label>
                        <input
                            type="file"
                            name="images"
                            id="images"
                            multiple
                            accept=".png, .jpg"
                            className="opacity-0 absolute"
                            onChange={handleImageUpload}
                        />
                        <small className="text-yellow-700">
                            {' '}
                            *Maximum of 3 images per post
                        </small>
                        <div className="flex flex-row justify-around gap-1">
                            {/* https://reacthustle.com/blog/react-preview-images-before-uploading */}
                            {urls.length > 0
                                ? urls.map((url, i) => (
                                      <img
                                          key={i}
                                          src={url}
                                          alt={imageFiles[i].name}
                                          className="w-1/3 h-auto rounded"
                                      />
                                  ))
                                : formData.images?.map((image, i) => (
                                      <img
                                          key={image.id || i}
                                          src={image.image}
                                          alt={`Existing listing image ${i + 1}`}
                                          className="w-1/3 h-auto rounded object-cover"
                                      />
                                  ))}
                        </div>
                    </div>
                    {categoryForm}
                    <button
                        type="submit"
                        className="my-3 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                        Update
                    </button>
                </form>
            </main>
        </div>
    );
}
