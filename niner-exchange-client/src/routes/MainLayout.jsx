import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';
import Footer from '../components/Footer.jsx';

export default function MainLayout() {
    const location = useLocation();
    const hideFooter = location.pathname.startsWith('/messages');

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
            <PageHeader showCategories={true} />
            <main className="flex-1 flex flex-col min-h-0">
                <Outlet />
            </main>
            {!hideFooter && <Footer />}
        </div>
    );
}
