import React from 'react';
import {Package, ShoppingBag } from 'lucide-react';

export default function ProfilePurchaseBuyerTab({ activeTab, setActiveTab }) {
    return(<div className="flex gap-1 mb-6 bg-gray-100 p-1 rounded-lg w-fit">
          <button
            onClick={() => setActiveTab('seller')}
            className={`flex items-center gap-2 px-6 py-3 rounded-md font-semibold transition-all ${
              activeTab === 'seller'
                ? 'bg-white text-emerald-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Package size={18} />
            Selling
          </button>
          <button
            onClick={() => setActiveTab('buyer')}
            className={`flex items-center gap-2 px-6 py-3 rounded-md font-semibold transition-all ${
              activeTab === 'buyer'
                ? 'bg-white text-emerald-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <ShoppingBag size={18} />
            Purchases
          </button>
        </div>);
}