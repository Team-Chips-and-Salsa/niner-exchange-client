import React, { useState, useEffect, useMemo } from 'react';
import {
    Search,
    BookOpen,
    Home,
    Package,
    Briefcase,
} from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import Footer from '../components/Footer.jsx';
import TextbookForm from '../components/createForm/textbooksForm.jsx';
import SubleaseForm from '../components/createForm/SubleaseForm.jsx';
import MarketplaceForm from '../components/createForm/MarketplaceForm.jsx';
import ApplyFairPrice from '../components/createForm/ApplyFairPrice.jsx';

const CATEGORIES = [
    { id: 'all', title: 'All', icon: Package },
    { id: 'textbooks', title: 'Textbooks', icon: BookOpen },
    { id: 'sublease', title: 'Housing', icon: Home },
    { id: 'marketplace', title: 'Marketplace', icon: Package },
    { id: 'services', title: 'Services', icon: Briefcase },
];

// Gemini's guided learning helped me debug an issue with sending form data between components
export default function CreateListingPage({ initialCategory = 'textbooks' }) {
    // const [title, setTitle] = useState('');
    // const [description, setDescription] = useState('');
    // const [price, setPrice] = useState('');
    // const [condition, setCondition] = useState('');
    const [viewMode, setViewMode] = useState('form');
    const [selectedCategory, setSelectedCategory] = useState(
        initialCategory || 'all',
    );
    const allformData = {
        title: '',
        desc: '',
        price: '',
        images: '',

        course: '',
        condition: 'new',

        prop: '',
        start: '',
        end: '',
        dist: '',
        beds: '',
        mates: '',
    };
    const [formData, setFormData] = useState(allformData);

    const priceUnitLabel = useMemo(() => {
        if (selectedCategory === 'services') return '/hr';
        if (selectedCategory === 'sublease') return '/mo';
        return '$';
    }, [selectedCategory]);

    function handleChange(event) {
        const {name, value} = event.target;

        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }))
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (selectedCategory === 'textbooks' || selectedCategory === 'marketplace') {
            setViewMode('calculator')
        }
        else {
            fetch('listings/', {
                method: 'POST',
                mode: 'cors',
                body: formData
            })
        }
    }

    // I may reset the fields if the category is changed
    function handleIconClick(catId) {
        setFormData(allformData);
        setSelectedCategory(catId);
    }

    const categoryForm = useMemo(() => {
        switch (selectedCategory) {
            case 'textbooks':
                return <TextbookForm
                formData={formData}
                onChange={handleChange}/>;
            case 'sublease':
                return <SubleaseForm
                formData={formData}
                onChange={handleChange}/>;
            case 'marketplace':
                return <MarketplaceForm
                formData={formData}
                onChange={handleChange}/>;
            default:
                return <></>;
        }
    }, [selectedCategory, formData, handleChange]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Remove header and footer */}
            {/* Header */}
            <PageHeader showCategories={true}/>
            <main className='flex-1 flex items-center justify-center px-20 py-5'>
{viewMode === 'form' ? ( 
                <form method='post'  onSubmit={handleSubmit} className='shadow rounded-lg max-w-lg w-full p-6 bg-zinc-300 text-gray-600 text-sm'>
                    <h2 className='text-center text-black text-lg font-semibold py-1'>What are you selling today?</h2>
                    <div className='flex flex-wrap justify-between *:grow *:items-center *:flex-col *:flex *:rouded-md *:border *:p-1 *:text-black'>
                        <button type='reset' onClick={() => handleIconClick('textbooks')} className={`rounded-l-md hover:bg-green-600 ${selectedCategory === 'textbooks' ? 'bg-green-600' : 'bg-white'}`}>
                            <BookOpen/>
                            <p>Textbooks</p>
                        </button>
                        <button type='reset' onClick={() => handleIconClick('sublease')} className={`hover:bg-green-600 ${selectedCategory === 'sublease' ? 'bg-green-600' : 'bg-white'}`}>
                            <Home/>
                            <p>Housing</p>
                        </button>
                        <button type='reset' onClick={() => handleIconClick('marketplace')} className={`hover:bg-green-600 ${selectedCategory === 'marketplace' ? 'bg-green-600' : 'bg-white'}`}>
                            <Package/>
                            <p>General Items</p>
                        </button>
                        <button type='reset' onClick={() => handleIconClick('services')} className={`rounded-r-md hover:bg-green-600 ${selectedCategory === 'services' ? 'bg-green-600' : 'bg-white'}`}>
                            <Briefcase/>
                            <p>Services</p>
                        </button>
                    </div>
                    <div className='flex flex-col gap-1'>
                        {(selectedCategory === 'textbooks' || selectedCategory === 'marketplace') && (
                            <small className='text-red-500'>*Price can be set in the next step with our <em>"Fair Price Calculator"</em></small>
                        )}
                        <label htmlFor="title">Title: </label>
                        <input type="text" name="title" id="title" placeholder='Title here' required value={formData.title} onChange={handleChange}/>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="desc">Description </label>
                        <textarea name="desc" id="desc" placeholder='Max length - 1000 characters' required maxLength={1000} value={formData.desc} onChange={handleChange}></textarea>
                    </div>
                    {/* Only want the price to show for this form for services and subleasing */}
                    {(selectedCategory === 'services' || selectedCategory === 'sublease') && (
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="price">Price: </label>
                            <input type="number" name="price" id="price" placeholder={priceUnitLabel} required value={formData.price} onChange={handleChange}/>
                        </div>
                    )}
                    <div>
                        <label htmlFor="images" className='inline-block my-3 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700'>Upload Images </label>
                        <input type="file" name='images' id='images' multiple accept='.png, .jpeg' className='hidden' value={formData.images} onChange={handleChange}/>
                    </div>
                    {categoryForm}
                    <button type='submit' className='my-3 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700'>
                        {(selectedCategory === 'services' || selectedCategory === 'sublease')
                            ? 'Post'
                            : 'Go to Fair Price Calculator'
                        }
                    </button>
                </form> ) : (
                <ApplyFairPrice formData={formData} onChange={handleChange} onBackClick={() => setViewMode('form')}/>
                )}
            </main>
            {/* Footer */}
            <Footer />
        </div>
    );
}
