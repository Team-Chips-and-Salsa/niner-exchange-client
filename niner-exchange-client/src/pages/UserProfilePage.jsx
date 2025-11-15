import React, { useState, useEffect } from 'react';
import { User, Calendar, Award, Edit, Package, ShoppingBag } from 'lucide-react';
import ProfileHeader from '../components/userProfile/profileHeader';

const UserProfilePage = () => {
  const [activeTab, setActiveTab] = useState('seller');
  const [currentListingsView, setCurrentListingsView] = useState(10);
  const [archivedListingsView, setArchivedListingsView] = useState(10);
  
  // Mock data - replace with actual API calls
  const [userData, setUserData] = useState({
    id: 1,
    first_name: 'Sam',
    last_name: 'Johnson',
    date_joined: '2024-09-15T10:30:00Z',
    email: 'sam@charlotte.edu',
    profile_image_url: null,
    avg_rating: 4.5,
    review_count: 12,
    status: 'ACTIVE',
    role: 'STUDENT',
    updated_at: '2024-11-10T15:45:00Z',
    items_sold_count: 8,
    bio: 'UNCC student selling textbooks and dorm essentials. Always happy to negotiate!',
    is_verified_student: true,
    last_active: '2024-11-15T09:20:00Z'
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

  const getRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 30) return `${diffDays}d ago`;
    return formatDate(dateString);
  };

  const [currentListings, setCurrentListings] = useState([
    { id: 1, title: 'Calculus Textbook', price: 45.00, image: null, type: 'TEXTBOOK', status: 'ACTIVE' },
    { id: 2, title: 'Blue Diamond Almonds', price: 10.00, image: null, type: 'ITEM', status: 'ACTIVE' },
    { id: 3, title: 'Desk Lamp', price: 15.00, image: null, type: 'ITEM', status: 'ACTIVE' },
    { id: 4, title: 'Chemistry Lab Coat', price: 20.00, image: null, type: 'ITEM', status: 'ACTIVE' },
    { id: 5, title: 'Studio Apartment', price: 850.00, image: null, type: 'SUBLEASE', status: 'ACTIVE' },
    { id: 6, title: 'Tutoring Services', price: 25.00, image: null, type: 'SERVICE', status: 'ACTIVE' },
  ]);

  const [archivedListings, setArchivedListings] = useState([
    { id: 7, title: 'Old Laptop', price: 200.00, image: null, type: 'ITEM', status: 'SOLD' },
    { id: 8, title: 'Biology Book', price: 30.00, image: null, type: 'TEXTBOOK', status: 'SOLD' },
  ]);

  const [buyerListings, setBuyerListings] = useState([
    { id: 9, title: 'Microwave', price: 50.00, image: null, type: 'ITEM', seller: 'john@charlotte.edu' },
    { id: 10, title: 'Mini Fridge', price: 75.00, image: null, type: 'ITEM', seller: 'jane@charlotte.edu' },
  ]);

  const getTypeBadgeColor = (type) => {
    const colors = {
      'ITEM': 'bg-emerald-100 text-emerald-700',
      'TEXTBOOK': 'bg-blue-100 text-blue-700',
      'SUBLEASE': 'bg-purple-100 text-purple-700',
      'SERVICE': 'bg-orange-100 text-orange-700',
    };
    return colors[type] || 'bg-gray-100 text-gray-700';
  };
  

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto py-8 px-6">
        {/* Profile Header Section */}
        <ProfileHeader userData={userData} formatDate={formatDate} getRelativeTime={getRelativeTime} />

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-gray-100 p-1 rounded-lg w-fit">
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
        </div>

        {/* Seller Tab Content */}
        {activeTab === 'seller' && (
          <div>
            {/* Current Listings */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Active Listings</h2>
                <select
                  value={currentListingsView}
                  onChange={(e) => setCurrentListingsView(Number(e.target.value))}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium bg-white hover:border-gray-400 transition-colors"
                >
                  <option value={10}>Show 10</option>
                  <option value={20}>Show 20</option>
                  <option value={50}>Show 50</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {currentListings.slice(0, currentListingsView).map((listing) => (
                  <div
                    key={listing.id}
                    className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer group"
                  >
                    <div className="aspect-square bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                      <Package size={48} className="text-gray-400" />
                    </div>
                    <div className="p-4">
                      <div className="mb-2">
                        <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getTypeBadgeColor(listing.type)}`}>
                          {listing.type}
                        </span>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">{listing.title}</h3>
                      <p className="text-emerald-600 font-bold text-lg">
                        ${listing.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Archived Listings */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Archived Listings</h2>
                <select
                  value={archivedListingsView}
                  onChange={(e) => setArchivedListingsView(Number(e.target.value))}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium bg-white hover:border-gray-400 transition-colors"
                >
                  <option value={10}>Show 10</option>
                  <option value={20}>Show 20</option>
                  <option value={50}>Show 50</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {archivedListings.slice(0, archivedListingsView).map((listing) => (
                  <div
                    key={listing.id}
                    className="bg-white border border-gray-200 rounded-lg overflow-hidden opacity-60 cursor-pointer"
                  >
                    <div className="aspect-square bg-gray-100 flex items-center justify-center relative">
                      <Package size={48} className="text-gray-400" />
                      <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                        SOLD
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="mb-2">
                        <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getTypeBadgeColor(listing.type)}`}>
                          {listing.type}
                        </span>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">{listing.title}</h3>
                      <p className="text-gray-500 font-bold text-lg">
                        ${listing.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Buyer Tab Content */}
        {activeTab === 'buyer' && (
          <div>
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Purchase History</h2>
              <p className="text-gray-600 mt-1">Items you've purchased from other users</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {buyerListings.map((listing) => (
                <div
                  key={listing.id}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer group"
                >
                  <div className="aspect-square bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                    <ShoppingBag size={48} className="text-gray-400" />
                  </div>
                  <div className="p-4">
                    <div className="mb-2">
                      <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getTypeBadgeColor(listing.type)}`}>
                        {listing.type}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">{listing.title}</h3>
                    <p className="text-emerald-600 font-bold text-lg mb-2">
                      ${listing.price.toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500">Seller: `${listing.seller.first_name} ${listing.seller.last_name}`</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfilePage;