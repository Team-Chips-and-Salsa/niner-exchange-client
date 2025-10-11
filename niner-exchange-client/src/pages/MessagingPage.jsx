import React, { useEffect, useMemo, useState } from 'react';
import {
    addDoc,
    collection,
    doc,
    increment,
    limit,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
    updateDoc,
    where,
} from 'firebase/firestore';
import { useAuth } from '../context/AuthContext.jsx';
import { db } from '../firebase.js';
import { useLocation, useNavigate } from 'react-router-dom';

import PageHeader from '../components/messaging/PageHeader.jsx';
import ConversationsList from '../components/messaging/ConversationsList.jsx';
import ChatHeader from '../components/messaging/ChatHeader.jsx';
import MessagesList from '../components/messaging/MessagesList.jsx';
import MessageInput from '../components/messaging/MessageInput.jsx';
import EmptyState from '../components/messaging/EmptyState.jsx';
import { getOtherParticipant } from '../helpers/messaging.js';

export default function MessagingPage() {
    const { currentUser } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const [selectedConversationId, setSelectedConversationId] = useState(null);
    const [message, setMessage] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [conversations, setConversations] = useState([]);
    const [currentMessages, setCurrentMessages] = useState([]);

    // Track viewport to decide desktop vs mobile behavior (Tailwind md breakpoint ~768px)
    const [isDesktop, setIsDesktop] = useState(() => {
        if (typeof window === 'undefined') return true;
        return window.innerWidth >= 768;
    });

    useEffect(() => {
        function handleResize() {
            if (typeof window === 'undefined') return;
            setIsDesktop(window.innerWidth >= 768);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // If navigated here with focusList=true, show the conversation list by clearing selection and avoid auto-select.
    useEffect(() => {
        if (location.state?.focusList) {
            setSelectedConversationId(null);
            // Clear the state so future renders behave normally
            navigate('.', { replace: true, state: {} });
        }
    }, [location.state, navigate]);

    // Subscribe to user's conversations
    useEffect(() => {
        if (!db || !currentUser) return;
        const q = query(
            collection(db, 'conversations'),
            where('participants', 'array-contains', currentUser.uid),
            orderBy('lastMessageAt', 'desc'),
        );
        const unsub = onSnapshot(q, (snap) => {
            const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
            setConversations(items);
        });
        return () => unsub();
    }, [currentUser]);

    // Subscribe to messages of selected conversation
    useEffect(() => {
        if (!db || !selectedConversationId) {
            setCurrentMessages([]);
            return;
        }
        const msgsQuery = query(
            collection(db, 'conversations', selectedConversationId, 'messages'),
            orderBy('createdAt', 'asc'),
            limit(500),
        );
        const unsub = onSnapshot(msgsQuery, (snap) => {
            const msgs = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
            setCurrentMessages(msgs);
        });
        return () => unsub();
    }, [selectedConversationId]);

    // Mark current conversation as read when opened or messages change
    useEffect(() => {
        if (!db || !selectedConversationId || !currentUser) return;
        const convRef = doc(db, 'conversations', selectedConversationId);
        updateDoc(convRef, { [`unreadCounts.${currentUser.uid}`]: 0 }).catch(
            () => {},
        );
    }, [selectedConversationId, currentUser, currentMessages.length]);

    // Auto-select the first conversation only on desktop when list loads.
    useEffect(() => {
        // If the navigation requested to focus the list, skip auto-select.
        if (location.state?.focusList) return;
        if (isDesktop && !selectedConversationId && conversations.length > 0) {
            setSelectedConversationId(conversations[0].id);
        }
    }, [isDesktop, conversations, selectedConversationId, location.state]);

    const currentConversation = useMemo(() => {
        return conversations.find((c) => c.id === selectedConversationId);
    }, [conversations, selectedConversationId]);

    const otherParticipant = useMemo(() => {
        return getOtherParticipant(currentConversation, currentUser?.uid);
    }, [currentConversation, currentUser]);

    const handleSendMessage = async () => {
        if (!message.trim() || !selectedConversationId || !db || !currentUser)
            return;
        const text = message.trim();
        setMessage('');
        const convRef = doc(db, 'conversations', selectedConversationId);
        const msgCol = collection(convRef, 'messages');
        const newMsg = {
            text,
            senderId: currentUser.uid,
            createdAt: serverTimestamp(),
        };
        try {
            await addDoc(msgCol, newMsg);
            // Update conversation preview and time
            const updates = {
                lastMessage: text,
                lastMessageAt: serverTimestamp(),
            };
            // Increment unread count for the other participant
            if (otherParticipant?.uid) {
                updates[`unreadCounts.${otherParticipant.uid}`] = increment(1);
            }
            await updateDoc(convRef, updates);
        } catch (e) {
            console.error('Failed to send message', e);
            // restore input on failure
            setMessage(text);
        }
    };

    const filteredConversations = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();
        if (!q) return conversations;
        return conversations.filter((conv) => {
            const otherUid = (conv.participants || []).find(
                (p) => p !== currentUser?.uid,
            );
            const info = conv.participantInfo?.[otherUid] || {};
            const name = info.name || 'Conversation';
            const listing = conv.listing || '';
            return (
                name.toLowerCase().includes(q) ||
                listing.toLowerCase().includes(q)
            );
        });
    }, [conversations, searchQuery, currentUser]);

    return (
        <div className="h-screen bg-gray-50 flex flex-col">
            <PageHeader showCategories={true} />
            <div className="flex-1 flex overflow-hidden w-full">
                <ConversationsList
                    conversations={filteredConversations}
                    currentUser={currentUser}
                    selectedConversationId={selectedConversationId}
                    onSelect={setSelectedConversationId}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                />

                {selectedConversationId ? (
                    <div className="flex-1 flex flex-col bg-white">
                        <ChatHeader
                            otherParticipant={otherParticipant}
                            currentConversation={currentConversation}
                            onBack={() => setSelectedConversationId(null)}
                        />
                        <MessagesList
                            messages={currentMessages}
                            currentUser={currentUser}
                        />
                        <MessageInput
                            message={message}
                            setMessage={setMessage}
                            onSend={handleSendMessage}
                            disabled={!db}
                        />
                    </div>
                ) : (
                    <EmptyState />
                )}
            </div>
            {!db && (
                <div className="p-2 text-center text-sm text-red-600 bg-red-50 border-t border-red-200">
                    Firebase is not configured. Set VITE_FIREBASE_* in your .env
                    to enable messaging.
                </div>
            )}
        </div>
    );
}
