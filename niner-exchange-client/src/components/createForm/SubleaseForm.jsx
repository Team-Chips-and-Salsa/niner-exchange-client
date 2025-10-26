import React, { useState, useEffect, useMemo } from 'react';

export default function SubleaseForm({formData, onChange}) {
    return (
        <div>
            <div className='flex flex-col gap-1'>
                <label htmlFor="prop">Property Type: </label>
                <select name="prop" id="prop" defaultValue="apt" required>
                    <option value="apt">Apartment</option>
                    <option value="house">House</option>
                </select>
            </div>
            <div className='flex flex-col gap-1'>
                {/* type=month is not supported in Firefox */}
                <label htmlFor="start">Lease start date: </label>
                <input type="date" name="start" id="start" min="2025-01" required onChange={onChange} value={formData.start}/>
                <label htmlFor="end">Lease end date: - <em>Optional</em></label>
                <input type="date" name="end" id="end" min="2025-01" onChange={onChange} value={formData.end}/>
            </div>
            <div className='flex flex-col gap-1'>
                <label htmlFor="dist">Distance from Campus: </label>
                <input type="number" name="dist" id="dist" placeholder='Minutes by car' required min={5} onChange={onChange} value={formData.dist}/>
            </div>
            <div className='flex flex-col gap-1'>
                <label htmlFor="beds"># of Bedrooms: </label>
                <input type="number" name="beds" id="beds" min={1} required onChange={onChange} value={formData.beds}/>
            </div>
            <div className='flex flex-col gap-1'>
                <label htmlFor="mates"># of Roommates: </label>
                <input type="number" name="mates" id="mates" min={1} required onChange={onChange} value={formData.mates}/>
            </div>
        </div>
    )
}