import React from 'react';
import { Search } from 'lucide-react';



export default function SearchBar() {
    return (
        <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-2 flex items-center gap-2">
                <Search className="w-6 h-6 text-gray-400 ml-4" />
                <input
                    type="text"
                    placeholder="Search for textbooks, housing, items, or services..."
                    className="flex-1 px-4 py-4 text-gray-900 focus:outline-none text-lg"
                />
                <button className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-8 py-4 rounded-xl font-bold hover:from-emerald-700 hover:to-emerald-800 transition-all">
                    <span className="hidden md:inline">Search</span>
                    <Search className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}
