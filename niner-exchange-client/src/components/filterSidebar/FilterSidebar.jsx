import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import sliderIcon from "../../assets/sliders-solid-full.svg";
import SubleasingFilter from './SubleasingFilter';
import TextbookFilter from './TextbookFilter';
import MarketplaceFilter from './MarketplaceFilter';


export default function FilterSidebar() {
    // const { searchParams } = useSearchParams();
    // const currentCategory = searchParams.get("category");
    
    
    return (
        <aside className='bg-zinc-400 p-5 w-full'>
            <div className='border-b border-grey-300 flex items-center justify-between'>
                <h3 className='font-semibold'>Filter Results</h3>
                <img src={sliderIcon} alt="FilterButton" width={30} height={30}/>
            </div>
            <MarketplaceFilter/>
            <button className='bg-green-300 pr-3 pl-3 rounded-md'>Apply</button>
        </aside>
    );
}