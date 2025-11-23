import React, { useEffect } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
    const [searchTerm, setSearchTerm] = React.useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        let path = '/search?listing_type=ALL&search=';
        let queryString = '';

        if (searchTerm) {
            queryString = `${encodeURIComponent(searchTerm)}`;
            navigate(`${path}${queryString}`);
        }
    };

    return (
        <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-2 flex items-center gap-2">
                <Search className="hidden md:inline w-6 h-6 text-gray-400 ml-4" />
                <input
                    type="text"
                    placeholder="Search for textbooks, housing, items, or services..."
                    className="flex-1 min-w-0 px-4 py-4 text-gray-900 focus:outline-none text-lg"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSearch();
                        }
                    }}
                />
                <button
                    className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-4 sm:px-8 py-3 sm:py-4 rounded-xl font-bold hover:from-emerald-700 hover:to-emerald-800 transition-all"
                    onClick={handleSearch}
                >
                    <span className="hidden md:inline">Search</span>
                    <Search className="md:hidden w-5 h-5" />
                </button>
            </div>
        </div>
    );
}
