import React, { useState, useEffect, useMemo } from 'react';

export default function MarketplaceForm({formData, onChange}) {
    return (
        <>
        <div className='flex flex-col gap-1'>
            <label htmlFor="condition">Condition: </label>
            <select name="condition" id="condition" required onChange={onChange} value={formData.condition}>
                <option value="NEW">New</option>
                <option value="LIKE_NEW">Like New</option>
                <option value="USED">Used</option>
            </select>
        </div>
        </>
    )
}