import React, { useState, useEffect, useMemo } from 'react';

export default function SubleaseForm({ formData, onChange }) {
    return (
        <div>
            <div className='flex flex-col gap-1'>
                <label htmlFor="property_type">Property Type: </label>
                <select name="property_type" id="property_type" required onChange={onChange} value={formData.property_type}>
                    <option value="APARTMENT">Apartment</option>
                    <option value="HOUSE">House</option>
                </select>
            </div>
            <div className='flex flex-col gap-1'>
                <label htmlFor="physical_address">Address: </label>
                <input type="text" name="physical_address" id="physical_address" placeholder='9201 University City Blvd, Charlotte, NC 28223' required min={5} onChange={onChange} value={formData.physical_address} />
            </div>
            <div className='flex flex-col gap-1'>
                {/* type=month is not supported in Firefox */}
                <label htmlFor="start_date">Lease start date: </label>
                <input type="date" name="start_date" id="start_date" min="2025-01" required onChange={onChange} value={formData.start_date} />
                <label htmlFor="end">Lease end date: - <em>Optional</em></label>
                <input type="date" name="end_date" id="end_date" min="2025-01" onChange={onChange} value={formData.end_date} />
            </div>
            <div className='flex flex-col gap-1'>
                <label htmlFor="distance_from_campus_minutes">Distance from Campus: </label>
                <input type="number" name="distance_from_campus_minutes" id="distance_from_campus_minutes" placeholder='Minutes by car' required min={5} onChange={onChange} value={formData.distance_from_campus_minutes} />
            </div>
            <div className='flex flex-col gap-1'>
                <label htmlFor="number_of_bedrooms"># of Bedrooms: </label>
                <input type="number" name="number_of_bedrooms" id="number_of_bedrooms" min={1} required onChange={onChange} value={formData.number_of_bedrooms} />
            </div>
            <div className='flex flex-col gap-1'>
                <label htmlFor="number_of_roommates"># of Roommates: </label>
                <input type="number" name="number_of_roommates" id="number_of_roommates" min={1} required onChange={onChange} value={formData.number_of_roommates} />
            </div>
        </div>
    )
}