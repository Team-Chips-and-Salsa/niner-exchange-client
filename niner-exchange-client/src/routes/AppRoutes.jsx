// src/routes/AppRoutes.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import NinerExchangeAuth from '../login.jsx';
import MessagingPage from '../pages/MessagingPage.jsx';

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
                path="/messages"
                element={
                    <ProtectedRoute>
                        <MessagingPage />
                    </ProtectedRoute>
                }
            />
            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}
