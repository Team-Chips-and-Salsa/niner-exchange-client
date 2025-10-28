import React, { useState, useEffect, useMemo, use } from 'react';
import { useSearchParams } from 'react-router-dom';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

// AI helped me find the rc-slider tool to help create a slider to return a range of values to filter
export default function MarketplaceFilter() {
    const PRICE_MIN = 0;
    const PRICE_MAX = 400;
    const [priceRange, setPriceRange] = useState([PRICE_MIN,PRICE_MAX]);

    const [condition, setCondition] = useState('');

    const descRegex = /[^a-zA-Z]/;
    return (
        <div>
            <div className='border-b border-grey-300'>
                <h2>Price Range</h2>
                <div>
                    <Slider range
                        min={PRICE_MIN}
                        max={PRICE_MAX}
                        step={25}
                        value={priceRange}
                        onChange={(newRange) => setPriceRange(newRange)}
                    />
                </div>
                <div className='flex justify-between'>
                    <div>
                        <small>Minimum</small>
                        <small className='font-bold'>${priceRange[0]}</small>
                    </div>
                    <div>
                        <small>Maximum</small>
                        <small className='font-bold'>${priceRange[1]}</small>
                    </div>
                </div>
            </div>
            <div className='border-b border-grey-300'>
                <h2>Current Condition</h2>
                <small>Poor --- Excellent</small>
                <select name="condition" id="condition" required onChange={(selectedConditon) => setCondition(selectedConditon)}>
                    <option value="">---</option>
                    <option value="new">New</option>
                    <option value="like-new">Like New</option>
                    <option value="very-good">Very Good</option>
                    <option value="good">Good</option>
                    <option value="acceptable">Acceptable</option>
                    <option value="unacceptable">Unacceptable</option>
                </select>
            </div>
            <div className='border-b border-grey-300'>
                <h2>Description</h2>
                <label htmlFor="desc">Product Description</label>
                <textarea name="desc" id="desc" maxLength={500} title='No special characters' rows={4} cols={30}
                placeholder='Add a short product description'></textarea>
            </div>
        </div>
    );
}