/*
    Used AI to generate this UI component based on our own design without connection with backend code
    Used AI to figure out how to use Firebase Firestore for real-time messaging
    Used AI to figure out how to implement a location picker with react-leaflet
    Used AI to improve site responsiveness
    We modularized the messaging UI into components under src/components/messaging/
 */
import React, { useEffect, useMemo, useState } from 'react';
import {
    addDoc,
    collection,
    deleteDoc,
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
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import ConversationsList from '../components/messaging/ConversationsList.jsx';
import ChatHeader from '../components/messaging/ChatHeader.jsx';
import MessagesList from '../components/messaging/MessagesList.jsx';
import MessageInput from '../components/messaging/MessageInput.jsx';
import EmptyState from '../components/messaging/EmptyState.jsx';
import { getOtherParticipant } from '../helpers/messaging.js';
import TransactionProposalModal from '../components/messaging/transaction/TransactionProposalModal.jsx';
import ConfirmationModal from '../components/common/ConfirmationModal.jsx';
import {
    getMeetupLocations,
    createTransaction,
    updateTransactionStatus,
} from '../services/api.js';
import { fetchListingById } from '../services/listingApi.js';

export default function MessagingPage() {
    const { currentUser } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const [selectedConversationId, setSelectedConversationId] = useState(null);
    const [message, setMessage] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [conversations, setConversations] = useState([]);
    const [currentMessages, setCurrentMessages] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isCompleting, setIsCompleting] = useState(false);
    const [isListingSold, setIsListingSold] = useState(false);
    const [isCompletionModalOpen, setIsCompletionModalOpen] = useState(false);

    // Transaction proposal UI state
    const [isProposalOpen, setIsProposalOpen] = useState(false);
    const [meetupLocations, setMeetupLocations] = useState([]);
    const [loadingLocations, setLoadingLocations] = useState(false);

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

    useEffect(() => {
        if (location.state?.focusList) {
            setSelectedConversationId(null);
            navigate('.', { replace: true, state: {} });
        }
    }, [location.state, navigate]);

    // Subscribe to user's conversations
    useEffect(() => {
        if (!db || !currentUser) return;
        const q = query(
            collection(db, 'conversations'),
            where('participants', 'array-contains', currentUser.id),
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
        updateDoc(convRef, { [`unreadCounts.${currentUser.id}`]: 0 }).catch(
            () => {},
        );
    }, [selectedConversationId, currentUser, currentMessages.length]);

    const [searchParams, setSearchParams] = useSearchParams();

    // Sync selectedConversationId with URL search params
    useEffect(() => {
        if (location.state?.focusList) {
            setSearchParams({});
            return;
        }

        const conversationIdFromUrl = searchParams.get('conversationId');

        if (conversationIdFromUrl) {
            if (selectedConversationId !== conversationIdFromUrl) {
                setSelectedConversationId(conversationIdFromUrl);
            }
        } else {
            // URL has no ID
            if (isDesktop) {
                // On desktop, ensure a conversation is selected if available
                if (conversations.length > 0) {
                    // If nothing selected, or if we want to enforce the first one when URL is empty
                    // We check if the currently selected ID is valid (exists in conversations)
                    // If not, or if null, select the first one.
                    const isValidSelection = conversations.some(
                        (c) => c.id === selectedConversationId,
                    );

                    if (!selectedConversationId || !isValidSelection) {
                        setSelectedConversationId(conversations[0].id);
                        // Optional: Update URL to reflect this auto-selection?
                        // setSearchParams({ conversationId: conversations[0].id }, { replace: true });
                        // User asked for "conversation id should be hande always", so maybe yes.
                        // But let's stick to just setting state for now to avoid infinite loops or aggressive URL changes on load.
                    }
                }
            } else {
                // On mobile, if no ID in URL, show list (null selection)
                if (selectedConversationId !== null) {
                    setSelectedConversationId(null);
                }
            }
        }
    }, [
        isDesktop,
        conversations,
        selectedConversationId,
        location.state,
        searchParams,
        setSearchParams,
    ]);

    const handleSelectConversation = (id) => {
        setSearchParams({ conversationId: id });
    };

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleBackToConversations = () => {
        setSearchParams({});
    };

    const handleDeleteConversation = () => {
        if (!selectedConversationId) return;
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!selectedConversationId || !db) return;

        setIsDeleting(true);
        try {
            await deleteDoc(doc(db, 'conversations', selectedConversationId));
            setSelectedConversationId(null);
            setSearchParams({});
            setIsDeleteModalOpen(false);
        } catch (error) {
            console.error('Failed to delete conversation:', error);
            alert('Failed to delete conversation. Please try again.');
        } finally {
            setIsDeleting(false);
        }
    };

    const currentConversation = useMemo(() => {
        return conversations.find((c) => c.id === selectedConversationId);
    }, [conversations, selectedConversationId]);

    const activeTransaction = useMemo(() => {
        return [...currentMessages]
            .reverse()
            .find(
                (msg) =>
                    msg.type === 'TRANSACTION_PROPOSAL' &&
                    (msg.status === 'ACCEPTED' || msg.status === 'COMPLETED'),
            );
    }, [currentMessages]);

    useEffect(() => {
        if (!currentConversation?.listingId) return;
        fetchListingById(currentConversation.listingId)
            .then((data) => {
                // Check if listing is sold (status is 'SOLD' or is_sold is true)
                const sold =
                    data.status === 'SOLD' ||
                    data.is_sold === true ||
                    data.listing_status === 'SOLD';
                setIsListingSold(!!sold);
            })
            .catch((err) =>
                console.error('Failed to fetch listing status', err),
            );
    }, [currentConversation?.listingId]);

    const isSeller = currentUser?.id === currentConversation?.listingSellerId;

    const isTransactionCompleted = activeTransaction?.status === 'COMPLETED';
    const canComplete =
        isSeller && activeTransaction && !isTransactionCompleted;
    const isMessagingDisabled = isTransactionCompleted && isListingSold;

    const handleOpenCompletionModal = () => {
        setIsCompletionModalOpen(true);
    };

    const handleConfirmCompletion = async () => {
        setIsCompletionModalOpen(false);
        await handleCompleteTransaction();
    };

    const handleCompleteTransaction = async () => {
        if (!activeTransaction || isCompleting || !otherParticipant?.uid) {
            console.error('Cannot complete transaction: Missing data', {
                activeTransaction,
                isCompleting,
                otherParticipant,
            });
            alert('Could not complete transaction, user data is missing.');
            return;
        }

        setIsCompleting(true);
        try {
            await updateTransactionStatus(
                activeTransaction.transactionUuid,
                'COMPLETED',
            );

            const msgRef = doc(
                db,
                'conversations',
                selectedConversationId,
                'messages',
                activeTransaction.id,
            );
            await updateDoc(msgRef, { status: 'COMPLETED' });

            navigate(
                `/review-user/${otherParticipant.uid}/${activeTransaction.transactionUuid}`,
            );
        } catch (err) {
            console.error('Failed to complete transaction:', err);
            alert('Failed to complete transaction. Please try again.');
        } finally {
            setIsCompleting(false);
        }
    };
    const otherParticipant = useMemo(() => {
        return getOtherParticipant(currentConversation, currentUser?.id);
    }, [currentConversation, currentUser]);

    const handleSendMessage = async () => {
        if (
            !message.trim() ||
            !selectedConversationId ||
            !db ||
            !currentUser ||
            isMessagingDisabled
        )
            return;
        const text = message.trim();
        setMessage('');
        const convRef = doc(db, 'conversations', selectedConversationId);
        const msgCol = collection(convRef, 'messages');
        const newMsg = {
            text,
            senderId: currentUser.id,
            createdAt: serverTimestamp(),
        };
        try {
            await addDoc(msgCol, newMsg);
            const updates = {
                lastMessage: text,
                lastMessageAt: serverTimestamp(),
            };
            if (otherParticipant?.uid) {
                updates[`unreadCounts.${otherParticipant.uid}`] = increment(1);
            }
            await updateDoc(convRef, updates);
        } catch (e) {
            console.error('Failed to send message', e);
            setMessage(text);
        }
    };

    const openProposal = async () => {
        if (!selectedConversationId || !currentConversation) return;
        if (meetupLocations.length === 0 && !loadingLocations) {
            setLoadingLocations(true);
            try {
                const locs = await getMeetupLocations();
                setMeetupLocations(
                    Array.isArray(locs) ? locs : locs?.results || [],
                );
            } catch (e) {
                console.error('Failed to fetch meetup locations', e);
            } finally {
                setLoadingLocations(false);
            }
        }
        setIsProposalOpen(true);
    };

    const handleSubmitProposal = async ({
        price,
        meetup_location,
        exchangeZoneName,
        exchangeLat,
        exchangeLng,
    }) => {
        if (!db || !currentUser || !currentConversation || !otherParticipant)
            return;

        let finalBuyerId, finalSellerId;

        if (isSeller) {
            finalSellerId = currentUser.id;
            finalBuyerId = otherParticipant.id || otherParticipant.uid;
        } else {
            finalBuyerId = currentUser.id;
            finalSellerId = otherParticipant.id || otherParticipant.uid;
        }

        if (!finalBuyerId || !finalSellerId) {
            console.error('Missing participant IDs');
            alert('Cannot create transaction: missing participant IDs.');
            return;
        }

        let tx;
        try {
            tx = await createTransaction({
                listing: currentConversation.listingId,
                buyer: finalBuyerId,
                seller: finalSellerId,
                meetup_location,
                final_price: price,
            });
        } catch (e) {
            console.error('Failed to create transaction', e);
            alert('Failed to create transaction. Please try again.');
            return;
        }

        const transactionUuid = tx?.uuid || tx?.id || tx?.transaction_uuid;
        const zoneName =
            exchangeZoneName ||
            meetupLocations.find(
                (z) => String(z.id) === String(meetup_location),
            )?.name ||
            'Selected Location';

        if (!transactionUuid) {
            console.error('Backend did not return a transaction UUID');
            alert(
                'Transaction was created but missing a UUID in the response.',
            );
            return;
        }

        const convRef = doc(db, 'conversations', selectedConversationId);
        const msgCol = collection(convRef, 'messages');
        const proposalMsg = {
            type: 'TRANSACTION_PROPOSAL',
            transactionUuid,
            price,
            meetup_location,
            exchangeZoneName: zoneName,
            exchangeLat: Number.isFinite(exchangeLat) ? exchangeLat : undefined,
            exchangeLng: Number.isFinite(exchangeLng) ? exchangeLng : undefined,
            status: 'PENDING',
            senderId: currentUser.id,
            createdAt: serverTimestamp(),
            listingImage: currentConversation.listingImage,
            listingTitle: currentConversation.listingTitle,
        };
        try {
            await addDoc(msgCol, proposalMsg);
            const updates = {
                lastMessage: `Proposal: $${price} at ${zoneName}`,
                lastMessageAt: serverTimestamp(),
            };
            if (otherParticipant?.uid) {
                updates[`unreadCounts.${otherParticipant.uid}`] = increment(1);
            }
            await updateDoc(convRef, updates);
        } catch (e) {
            console.error('Failed to add proposal message', e);
            alert('Failed to add proposal message.');
        }
    };

    const handleAcceptProposal = async (msg) => {
        if (isSubmitting) return;
        if (!db || !selectedConversationId || !msg?.transactionUuid) return;
        setIsSubmitting(true);
        try {
            await updateTransactionStatus(msg.transactionUuid, 'ACCEPTED');
        } catch (e) {
            console.error('Failed to accept transaction', e);
            alert('Failed to accept transaction.');
            setIsSubmitting(false);
            return;
        }
        try {
            const msgRef = doc(
                db,
                'conversations',
                selectedConversationId,
                'messages',
                msg.id,
            );
            await updateDoc(msgRef, { status: 'ACCEPTED' });
            const convRef = doc(db, 'conversations', selectedConversationId);
            await updateDoc(convRef, {
                lastMessage: 'Meetup Accepted',
                lastMessageAt: serverTimestamp(),
            });
        } catch (e) {
            console.error('Failed to update Firestore message status', e);
        }
        setIsSubmitting(false);
    };

    const handleRejectProposal = async (msg) => {
        if (isSubmitting) return;
        if (!db || !selectedConversationId || !msg?.transactionUuid) return;
        setIsSubmitting(true);
        try {
            await updateTransactionStatus(msg.transactionUuid, 'REJECTED');
        } catch (e) {
            console.error('Failed to reject transaction', e);
            alert('Failed to reject transaction.');
            setIsSubmitting(false);
            return;
        }
        try {
            const msgRef = doc(
                db,
                'conversations',
                selectedConversationId,
                'messages',
                msg.id,
            );
            await updateDoc(msgRef, { status: 'REJECTED' });
            const convRef = doc(db, 'conversations', selectedConversationId);
            await updateDoc(convRef, {
                lastMessage: 'Meetup Declined',
                lastMessageAt: serverTimestamp(),
            });
        } catch (e) {
            console.error('Failed to update Firestore message status', e);
        }
        setIsSubmitting(false);
    };

    const filteredConversations = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();
        if (!q) return conversations;
        return conversations.filter((conv) => {
            const otherUid = (conv.participants || []).find(
                (p) => p !== currentUser?.id,
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
        <div className="flex-1 bg-gray-50 flex flex-col min-h-0">
            <div className="flex-1 flex overflow-hidden w-full relative">
                {/* 
                    Mobile behavior: 
                    - If no conversation selected: Show List, Hide Chat
                    - If conversation selected: Hide List, Show Chat
                    
                    Desktop behavior:
                    - Always show List
                    - Always show Chat (or EmptyState)
                 */}
                <div
                    className={`${
                        !isDesktop && selectedConversationId
                            ? 'hidden'
                            : 'flex w-full md:w-auto'
                    }`}
                >
                    <ConversationsList
                        conversations={filteredConversations}
                        currentUser={currentUser}
                        selectedConversationId={selectedConversationId}
                        onSelect={handleSelectConversation}
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                    />
                </div>

                <div
                    className={`${
                        !isDesktop && !selectedConversationId
                            ? 'hidden'
                            : 'flex flex-1'
                    }`}
                >
                    {selectedConversationId ? (
                        <div className="flex-1 flex flex-col bg-white w-full">
                            <ChatHeader
                                otherParticipant={otherParticipant}
                                currentConversation={currentConversation}
                                onBack={handleBackToConversations}
                                canComplete={canComplete}
                                isCompleting={isCompleting}
                                onCompleteTransaction={
                                    handleOpenCompletionModal
                                }
                                onDeleteConversation={handleDeleteConversation}
                            />
                            <MessagesList
                                messages={currentMessages}
                                currentUser={currentUser}
                                onAcceptProposal={handleAcceptProposal}
                                onRejectProposal={handleRejectProposal}
                                isSubmitting={isSubmitting}
                            />
                            <MessageInput
                                message={message}
                                setMessage={setMessage}
                                onSend={handleSendMessage}
                                disabled={!db || isMessagingDisabled}
                                onOpenProposal={openProposal}
                            />
                        </div>
                    ) : (
                        <EmptyState />
                    )}
                </div>
            </div>
            {!db && (
                <div className="p-2 text-center text-sm text-red-600 bg-red-50 border-t border-red-200">
                    Firebase is not configured. Set VITE_FIREBASE_* in .env to
                    enable messaging.
                </div>
            )}

            <TransactionProposalModal
                isOpen={isProposalOpen}
                onClose={() => setIsProposalOpen(false)}
                onSubmit={handleSubmitProposal}
                locations={meetupLocations}
            />
            <ConfirmationModal
                isOpen={isCompletionModalOpen}
                onClose={() => setIsCompletionModalOpen(false)}
                onConfirm={handleConfirmCompletion}
                title="Complete Transaction?"
                message="Are you sure you want to mark this transaction as completed? This will mark your item as SOLD and disable further messaging for this conversation."
                confirmText="Yes, Complete Transaction"
                isSubmitting={isCompleting}
                type="warning"
            />
            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Delete Conversation?"
                message="Are you sure you want to delete this conversation? This action cannot be undone."
                confirmText="Delete"
                isSubmitting={isDeleting}
                type="danger"
            />
        </div>
    );
}
