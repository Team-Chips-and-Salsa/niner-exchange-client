import React, { useState, useEffect, useMemo } from 'react';

export default function MarketplaceForm({formData, onChange}) {
    return (
        <>
        <div className='flex flex-col gap-1'>
            <label htmlFor="cond">Condition: </label>
            <select name="condition" id="condition" required onChange={onChange} value={formData.condition}>
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