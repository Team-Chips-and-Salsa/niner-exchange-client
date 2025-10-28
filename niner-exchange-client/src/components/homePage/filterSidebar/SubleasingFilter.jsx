import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

// AI helped me find the rc-slider tool to help create a slider to return a range of values to filter
export default function SubleasingFilter() {
    //Eventually replace these values with the lowest and highest values out of all the current listings
    const PRICE_MIN = 400;
    const PRICE_MAX = 1000;
    const [priceRange, setPriceRange] = useState([PRICE_MIN,PRICE_MAX]);

    const DISTANCE_MIN = 5;
    const DISTANCE_MAX = 60;
    const [distanceRange, setDistanceRange] = useState([DISTANCE_MIN, DISTANCE_MAX]);

    const ROOMMATES_MIN = 0;
    const ROOMMATES_MAX = 10;
    const [roommatesRange, setNumRoommates] = useState([ROOMMATES_MIN, ROOMMATES_MAX]);

    return (
        <div>
            <div>
                <h3 className='font-semibold'>Property Type</h3>
                <button className='bg-green-300 pr-3 pl-3'>Apartment</button><button className='bg-white pr-3 pl-3'>House</button>
            </div>
            <div className='border-b border-grey-300'>
                <h2>Price Range</h2>
                <small>Month Rent</small>
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
                <h2>Distance From Campus</h2>
                <small>Minutes by car</small>
                <div>
                    <Slider range
                        min={DISTANCE_MIN}
                        max={DISTANCE_MAX}
                        step={5}
                        value={distanceRange}
                        onChange={(newRange) => setDistanceRange(newRange)}
                    />
                </div>
                <div className='flex justify-between'>
                    <div>
                        <small>Minimum</small>
                        <small className='font-bold'>{distanceRange[0]}</small>
                    </div>
                    <div>
                        <small>Maximum</small>
                        <small className='font-bold'>{distanceRange[1]}</small>
                    </div>
                </div>
            </div>
            <div className='border-b border-grey-300'>
                <h2>Number of Roommates</h2>
                <div>
                    <Slider range
                        min={ROOMMATES_MIN}
                        max={ROOMMATES_MAX}
                        value={roommatesRange}
                        onChange={(newRange) => setNumRoommates(newRange)}
                    />
                </div>
                <div className='flex justify-between'>
                    <div>
                        <small>Minimum</small>
                        <small className='font-bold'>{roommatesRange[0]}</small>
                    </div>
                    <div>
                        <small>Maximum</small>
                        <small className='font-bold'>{roommatesRange[1]}</small>
                    </div>
                </div>
            </div>
        </div>
    );
}