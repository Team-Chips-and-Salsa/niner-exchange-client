import React, { useState, useEffect, useMemo } from 'react';

export default function TextbookForm({formData, onChange}) {
    return (
        <>
        <div className='flex flex-col gap-1'>
            <label htmlFor="course">Course Code: </label>
            <input type="text" name="course" id="course" placeholder='Ex. ITSC1213' required pattern='[A-Z]{3,4}[0-9]{3,4}' 
            onChange={onChange} value={formData.course}/>
        </div>
        <div className='flex flex-col gap-1'>
            <label htmlFor="condition">Condition: </label>
            <select name="condition" id="condition" required value={formData.condition} onChange={onChange}>
                <option value="new">New</option>
                <option value="like-new">Like New</option>
                <option value="very-good">Very Good</option>
                <option value="good">Good</option>
                <option value="acceptable">Acceptable</option>
                <option value="unacceptable">Unacceptable</option>
            </select>
        </div>
        </>
    )
}