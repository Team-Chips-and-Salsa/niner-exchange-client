import React, { useEffect, useMemo, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';
import Footer from '../components/Footer.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { db } from '../firebase.js';
import {
    collection,
    onSnapshot,
    orderBy,
    query,
    where,
} from 'firebase/firestore';

export default function MainLayout() {
    const location = useLocation();
    const isMessagingPage = location.pathname.startsWith('/messages');
    let hideFooter = false;
    if (
        isMessagingPage ||
        location.pathname.startsWith('/review-user') ||
        location.pathname.startsWith('/create') ||
        location.pathname.startsWith('/listing/edit')
    ) {
        hideFooter = true;
    }

    const { currentUser } = useAuth();
    const [notifications, setNotifications] = useState([]);
    const [conversations, setConversations] = useState([]);

    // Use AI to figure out Notifications and unread messages
    useEffect(() => {
        if (!currentUser || !db) return;

        const notifQuery = query(
            collection(db, 'notifications'),
            where('userId', '==', currentUser.id),
            orderBy('created_at', 'desc'),
        );

        const unsubscribe = onSnapshot(notifQuery, (querySnapshot) => {
            const notifs = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setNotifications(notifs);
        });

        return () => unsubscribe();
    }, [currentUser]);

    useEffect(() => {
        if (!currentUser || !db) return;

        const convosQuery = query(
            collection(db, 'conversations'),
            where('participants', 'array-contains', currentUser.id),
        );

        const unsubscribe = onSnapshot(convosQuery, (querySnapshot) => {
            const convos = querySnapshot.docs.map((doc) => doc.data());
            setConversations(convos);
        });

        return () => unsubscribe();
    }, [currentUser]);

    const unreadNotifCount = useMemo(() => {
        return notifications.filter((n) => !n.is_read).length;
    }, [notifications]);

    const totalUnreadMessages = useMemo(() => {
        return conversations.reduce((total, convo) => {
            return total + (convo.unreadCounts?.[currentUser.id] || 0);
        }, 0);
    }, [conversations, currentUser]);

    return (
        // Used AI to fix messages scroll-overflow
        <div
            className={`${
                isMessagingPage ? 'h-screen' : 'min-h-screen'
            } flex flex-col bg-gradient-to-b from-gray-50 to-white`}
        >
            <PageHeader
                showListingTypes={true}
                notifications={notifications}
                unreadNotifCount={unreadNotifCount}
                totalUnreadMessages={totalUnreadMessages}
            />
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
