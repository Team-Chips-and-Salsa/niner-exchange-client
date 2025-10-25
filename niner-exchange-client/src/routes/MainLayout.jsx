import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';
import Footer from '../components/Footer.jsx';

export default function MainLayout() {
    const location = useLocation();
    const isMessagingPage = location.pathname.startsWith('/messages');
    const hideFooter = isMessagingPage;

    return (
        // Used AI to fix messages scroll-overflow
        <div
            className={`${
                isMessagingPage ? 'h-screen' : 'min-h-screen'
            } flex flex-col bg-gradient-to-b from-gray-50 to-white`}
        >
            <PageHeader showCategories={true} />
            <main
                className={`flex-1 flex flex-col ${
                    isMessagingPage ? 'min-h-0 overflow-hidden' : ''
                }`}
            >
                <Outlet />
            </main>
            {!hideFooter && <Footer />}
        </div>
    );
}
