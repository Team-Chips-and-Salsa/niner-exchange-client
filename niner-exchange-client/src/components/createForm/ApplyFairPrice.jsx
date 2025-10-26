import {
    ChevronLeft,
} from 'lucide-react';


export default function ApplyFairPrice({formData, onChange, onBackClick}) {

    function handleSubmit(event) {
        event.preventDefault();
        
        fetch('listings/', {
            method: 'POST',
            mode: 'cors',
            body: formData
        })
    }
    

    return (
        <div className='shadow rounded-lg max-w-lg w-full p-6 bg-zinc-300'>
            <button type='button' onClick={() => onBackClick('form')} className='shadow rounded-md p-1 bg-zinc-400'>
                <ChevronLeft/>
            </button>
            <h1>Fair Price Calculation</h1>
            <div className='flex flex-col gap-1'>
                <label htmlFor="price">Price: </label>
                <input type="number" name="price" id="price" placeholder={'$'} required value={formData.price} onChange={onChange}/>
            </div>
            <button type='submit' onSubmit={handleSubmit} className='my-3 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700'>Post</button>
        </div>
    )
}