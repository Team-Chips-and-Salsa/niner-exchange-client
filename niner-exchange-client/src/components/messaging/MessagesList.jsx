import React, { useEffect, useRef } from 'react';
import { Check } from 'lucide-react';
import { formatRelativeTime } from '../../helpers/messaging';
import TransactionRequestCard from './transaction/TransactionRequestCard.jsx';

export default function MessagesList({
    messages = [],
    currentUser,
    onAcceptProposal,
    onRejectProposal,
}) {
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gradient-to-b from-gray-50 to-white">
            <div className="w-full space-y-4">
                {messages.map((msg) => {
                    const isMe = msg.senderId === currentUser?.uid;

                    if (msg.type === 'TRANSACTION_PROPOSAL') {
                        return (
                            <TransactionRequestCard
                                key={msg.id}
                                msg={msg}
                                isMe={isMe}
                                onAccept={() => onAcceptProposal?.(msg)}
                                onReject={() => onRejectProposal?.(msg)}
                            />
                        );
                    }

                    const time = msg.createdAt
                        ? formatRelativeTime(msg.createdAt)
                        : '';
                    return (
                        <div
                            key={msg.id}
                            className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-md sm:max-w-lg ${isMe ? 'order-2' : 'order-1'}`}
                            >
                                <div
                                    className={`px-4 py-3 rounded-2xl ${isMe ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-br-sm' : 'bg-gray-100 text-gray-900 rounded-bl-sm'}`}
                                >
                                    <p className="text-sm sm:text-base">
                                        {msg.text}
                                    </p>
                                </div>
                                <div
                                    className={`flex items-center gap-1 mt-1 px-2 ${isMe ? 'justify-end' : 'justify-start'}`}
                                >
                                    <span className="text-xs text-gray-500">
                                        {time}
                                    </span>
                                    {isMe && (
                                        <Check className="w-4 h-4 text-gray-400" />
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
                <div ref={bottomRef} />
            </div>
        </div>
    );
}
