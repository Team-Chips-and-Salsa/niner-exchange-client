import React, { useState, useEffect, useMemo, use } from 'react';
import { useSearchParams } from 'react-router-dom';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

// AI helped me find the rc-slider tool to help create a slider to return a range of values to filter
export default function TextbookFilter() {
    const PRICE_MIN = 0;
    const PRICE_MAX = 200;
    const [priceRange, setPriceRange] = useState([PRICE_MIN,PRICE_MAX]);

    const [courseNumber, setCourseNumber] = useState('');

    const [condition, setCondition] = useState('');

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
                <h2>Course Code</h2>
                <label htmlFor="courseCode">Ex. 'ITSC1213'</label>
                <input type="text" name="courseCode" id="coureCode" maxLength={10} placeholder='Course Code' 
                pattern='[A-Z]{3,4}[0-9]{3,4}' title='Must have four capital letters and four numbers'onChange={(selectedCode) => setCourseNumber(selectedCode)}/>
            </div>
            <div className='border-b border-grey-300'>
                <h2>Current Condition</h2>
                <small>Poor --- Excellent</small>
                <select name="condition" id="condition" onChange={(selectedConditon) => setCondition(selectedConditon)}>
                    <option value="">---</option>
                    <option value="new">New</option>
                    <option value="like-new">Like New</option>
                    <option value="very-good">Very Good</option>
                    <option value="good">Good</option>
                    <option value="acceptable">Acceptable</option>
                    <option value="unacceptable">Unacceptable</option>
                </select>
            </div>
        </div>
    );
}