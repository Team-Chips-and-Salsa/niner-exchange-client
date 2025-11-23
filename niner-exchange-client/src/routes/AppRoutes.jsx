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
import UserProfilePage from '../pages/UserProfilePage.jsx';
import ReviewUserPage from '../pages/ReviewUserPage.jsx';
import ReviewsPage from '../pages/ReviewsPage.jsx';
import AdminPage from '../pages/AdminPage.jsx';
import ManageUsersPage from '../pages/ManageUsersPage.jsx';
import CreateReportPage from '../pages/CreateReportPage.jsx';

function RootRedirect() {
    const { currentUser } = useAuth();
    const to = currentUser ? '/home' : '/login';
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
                <Route path="profile/:userId" element={<UserProfilePage />} />
                <Route path="messages" element={<MessagingPage />} />
                <Route
                    path="review-user/:revieweeId/:transactionId"
                    element={<ReviewUserPage />}
                />
                <Route path="reviews/:userId" element={<ReviewsPage />} />
                <Route path="listing/:id" element={<ListingDetailPage />} />
                <Route path="listing/edit/:id" element={<EditListingPage />} />
                <Route path="admin" element={<AdminPage />} />
                <Route path="admin/users" element={<ManageUsersPage />} />
                <Route path='report/:type/:id' element={<CreateReportPage />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}
