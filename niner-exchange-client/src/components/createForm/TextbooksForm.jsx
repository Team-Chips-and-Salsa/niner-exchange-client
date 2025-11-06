import React, { useState, useEffect, useMemo } from 'react';

export default function TextbookForm({formData, onChange}) {
    return (
        <>
        <div className='flex flex-col gap-1'>
            <label htmlFor="course_code">Course Code: </label>
            <input type="text" name="course_code" id="course_code" placeholder='Ex. ITSC1213' required pattern='[A-Z]{3,4}[0-9]{3,4}' 
            onChange={onChange} value={formData.course_code}/>
        </div>
        <div className='flex flex-col gap-1'>
            <label htmlFor="condition">Condition: </label>
            <select name="condition" id="condition" required value={formData.condition} onChange={onChange}>
                <option value="NEW">New</option>
                <option value="LIKE_NEW">Like New</option>
                <option value="USED">Used</option>
            </select>
        </div>
        </>
    )
}