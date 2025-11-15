import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import NinerExchangeAuth from '../pages/AuthPage.jsx';
import MessagingPage from '../pages/MessagingPage.jsx';
import HomePage from '../pages/HomePage.jsx';
import SearchPage from '../pages/SearchPage.jsx';
import CreateListingPage from '../pages/CreateListingPage.jsx';
import MainLayout from './MainLayout.jsx';
import ListingDetailPage from '../pages/ListingDetailPage.jsx';
import EditListingPage from '../pages/EditListingPage.jsx';
import VerifyEmailPage from '../pages/VerifyEmailPage.jsx';

function RootRedirect() {
    const { currentUser } = useAuth();
    const to = currentUser ? '/messages' : '/login';
    return <Navigate to={to} replace />;
}

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<RootRedirect />} />
            <Route path="/login" element={<NinerExchangeAuth />} />
            <Route
                path="/verify-email/:uidb64/:token"
                element={<VerifyEmailPage />}
            />

            {/* Protected app with shared layout */}
            <Route
                element={
                    <ProtectedRoute>
                        <MainLayout />
                    </ProtectedRoute>
                }
            >
                <Route path="home" element={<HomePage />} />
                <Route path="search" element={<SearchPage />} />
                <Route path="create" element={<CreateListingPage />} />
                <Route path="messages" element={<MessagingPage />} />
                <Route path="listing/:id" element={<ListingDetailPage />} />
                <Route path="listing/edit/:id" element={<EditListingPage />} />
            </Route>

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}
